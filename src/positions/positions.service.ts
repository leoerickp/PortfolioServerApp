import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePositionDto, UpdatePositionDto } from './dto/inputs';
import { User } from '../users/entities/user.entity';
import { Position } from './entities/position.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationArgs } from '../common/dto/args/pagination.args';
import { SearchArgs } from '../common/dto/args/search.args';
import { searchTransform } from '../common/helpers/search-transform';
import { Experience } from '../experiences/entities/experience.entity';
import { ConfigService } from '@nestjs/config';
import { DataResponse } from '../common/types/data-response';

@Injectable()
export class PositionsService {

  private defaultLimit: number;

  constructor(
    @InjectModel(Position.name)
    private readonly positionsModel: Model<Position>,
    private readonly configService: ConfigService
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit'); // check env.config.ts
  }

  async create(createPositionDto: CreatePositionDto, user: User): Promise<Position> {

    try {
      const position = await this.positionsModel.create({ ...createPositionDto, lastUpdateBy: user });
      return position;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async createMany(createPositionDtos: CreatePositionDto[], experience: Experience, user: User): Promise<Position[]> {

    try {
      const positions = await this.positionsModel.insertMany(createPositionDtos.map((position) => {
        return { ...position, lastUpdateBy: user, experienceId: experience }
      }));
      return positions;

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(experienceId: string, pagination: PaginationArgs, searchArgs: SearchArgs): Promise<DataResponse<Position>> {
    const { limit = this.defaultLimit, offset = 0 } = pagination;
    const { search } = searchArgs;

    /*if (search) {
      const searchArr = searchTransform(search);
      // TODO: Mejorar las b??squedas por otros campos
      return await this.positionsModel.find({
        $or: searchArr.map(e => {
          return { position: { "$regex": e.trim(), "$options": "i" } }
        })
      })
        .limit(limit)
        .skip(offset);
    }*/


    const positions: Position[] = await this.positionsModel.find({ experienceId })
      .limit(limit)
      .skip(offset)
      .populate({ path: 'lastUpdateBy', select: 'name email' })
      .populate('hardSkillsId')
      .populate('experienceId');
    const count: number = await this.positionsModel.find({ experienceId }).count();
    return { count, data: positions }
  }


  async findOne(id: string): Promise<Position> {
    const position = await this.positionsModel.findById(id)
      .populate({ path: 'lastUpdateBy', select: 'name email' })
      .populate('hardSkillsId')
      .populate('experienceId');
    if (!position) {
      throw new NotFoundException(`${id} not found`);
    }
    return position;
  }

  async update(id: string, updatePositionDto: UpdatePositionDto, user: User): Promise<Position> {
    try {
      const position = await this.positionsModel.findByIdAndUpdate(
        id,
        {
          ...updatePositionDto,
          updatedDate: new Date(),
          lastUpdateBy: user
        },
        { new: true }
      )
        .populate({ path: 'lastUpdateBy', select: 'name email' })
        .populate('hardSkillsId')
        .populate('experienceId');

      return position;

    } catch (error) {
      this.handleExceptions(error);

    }
  }

  async remove(id: string, user: User): Promise<Position> {
    //return await this.update(id, { isVisible: false }, user);
    try {
      const position = await this.positionsModel.findByIdAndDelete(id);
      return position;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    console.log(error);
    if (error.code === 11000) {
      throw new BadRequestException(`"Position" exists in db ${JSON.stringify(error.keyValue)}`)
    }
    if (error.status === 400) {
      throw new BadRequestException(error.response.message)
    }
    if (error.status === 404) {
      throw new NotFoundException(error.response.message)
    }
    throw new InternalServerErrorException(`Can't create "position" - Check server`);
  }
}
