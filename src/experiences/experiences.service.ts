import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationArgs } from '../common/dto/args/pagination.args';
import { SearchArgs } from '../common/dto/args/search.args';
import { searchTransform } from '../common/helpers/search-transform';
import { ConfigService } from '@nestjs/config';
import { Experience } from './entities/experience.entity';
import { CreateExperienceDto, UpdateExperienceDto } from './dto/inputs';
import { User } from '../users/entities/user.entity';


@Injectable()
export class ExperiencesService {

  private defaultLimit: number;

  constructor(
    @InjectModel(Experience.name)
    private readonly experiencesModel: Model<Experience>,
    private readonly configService: ConfigService
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit'); // check env.config.ts
  }


  async create(createExperienceDto: CreateExperienceDto, user: User): Promise<Experience> {

    try {
      const experience = await this.experiencesModel.create(
        {
          ...createExperienceDto,
          lastUpdateBy: user,
        }
      );
      return experience;
    } catch (error) {
      this.handleExceptions(error);

    }
  }

  async findAll(pagination: PaginationArgs, searchArgs: SearchArgs): Promise<Experience[]> {
    const { limit = this.defaultLimit, offset = 0 } = pagination;
    const { search } = searchArgs;

    if (search) {
      const searchArr = searchTransform(search);
      // TODO: Mejorar las búsquedas por otros campos
      return await this.experiencesModel.find({
        $or: searchArr.map(e => {
          return { company: { "$regex": e.trim(), "$options": "i" } }
        })
      })
        .limit(limit)
        .skip(offset)
        .populate('lastUpdateBy');
    }

    return await this.experiencesModel.find()
      .limit(limit)
      .skip(offset)
      .populate('lastUpdateBy');
  }

  async findOne(id: string): Promise<Experience> {
    const experience = await this.experiencesModel.findById(id).populate('lastUpdateBy');
    if (!experience) {
      throw new NotFoundException(`${id} not found`);
    }
    return experience;
  }

  async update(id: string, updateExperienceDto: UpdateExperienceDto, user: User): Promise<Experience> {

    /*const { insertPositions, updatePositions } = updateExperienceInput;
    const currentExperience = await this.findOne(id);
    if (currentExperience.positionsId.length !== updatePositions.length) {
      throw new BadRequestException('There are some lost positions');
    }
    const currPositions = currentExperience.positionsId.map(currPos => currPos._id.toString());
    updatePositions.map(position => {
      if (!currPositions.includes(position.id)) {
        throw new BadRequestException('One of Positions do not match with the current positions in DB');
      }
    });
  
    let positions = [];
  
    if (updatePositions) {
      const promises = [];
      for (const postion of updateExperienceInput.updatePositions) {
        promises.push(this.positionsModel.findByIdAndUpdate(postion.id, { ...postion, updatedDate: new Date(), lastUpdateBy: user, }));
      }
      const updatedPositions = await Promise.all(promises);
      positions = [...updatedPositions.map(updatedPosition => updatedPosition._id)];
    }
  
    if (insertPositions) {
      const insertedPositions = await this.positionsModel.insertMany(updateExperienceInput.insertPositions);
      positions.push(...insertedPositions.map(insertedPosition => insertedPosition._id));
    }*/
    try {
      const experience = await this.experiencesModel.findByIdAndUpdate(
        id,
        {
          ...updateExperienceDto,
          updatedDate: new Date(),
          lastUpdateBy: user,
        },
        { new: true }
      ).populate('lastUpdateBy');

      return experience;

    } catch (error) {
      this.handleExceptions(error);

    }
  }

  async remove(id: string, user: User) {
    return await this.update(id, { isVisible: false }, user);
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`"Experiencie" exists in db ${JSON.stringify(error.keyValue)}`)
    }
    if (error.status === 400) {
      throw new BadRequestException(error.response.message)
    }
    if (error.status === 404) {
      throw new NotFoundException(error.response.message)
    }
    throw new InternalServerErrorException(`Can't create "experiencie" - Check server`);
  }
}
