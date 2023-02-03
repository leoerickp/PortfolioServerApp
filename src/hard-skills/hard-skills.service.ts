import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateHardSkillDto, UpdateHardSkillDto } from './dto/inputs';
import { HardSkill } from './entities/hard-skill.entity';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationArgs } from '../common/dto/args/pagination.args';
import { User } from '../users/entities/user.entity';
import { ValidSkillTypes } from './enums/valid-skilltypes.enum';
import { ConfigService } from '@nestjs/config';
import { DataResponse } from '../common/types/data-response';

@Injectable()
export class HardSkillsService {
  private defaultLimit: number;

  constructor(
    @InjectModel(HardSkill.name)
    private readonly hardSkillsModel: Model<HardSkill>,
    private readonly configService: ConfigService
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit'); // check env.config.ts
  }

  async create(createHardSkillDto: CreateHardSkillDto, user: User): Promise<HardSkill> {
    try {
      const hardSkill = await this.hardSkillsModel.create({ ...createHardSkillDto, lastUpdateBy: user });
      return hardSkill;

    } catch (error) {
      this.handleExceptions(error);

    }
  }

  async findAll(skillTypes: ValidSkillTypes[], pagination: PaginationArgs): Promise<DataResponse<HardSkill>> {
    const { limit = this.defaultLimit, offset = 0 } = pagination;
    if (!skillTypes || skillTypes.length === 0) {
      const hardSkills: HardSkill[] = await this.hardSkillsModel.find().populate({ path: 'lastUpdateBy', select: 'name email' })
        .limit(limit)
        .skip(offset);
      const count: number = await this.hardSkillsModel.find().count();
      return { count, data: hardSkills }
    }
    else {
      const hardSkills: HardSkill[] = await this.hardSkillsModel.find({ skillType: skillTypes }).populate({ path: 'lastUpdateBy', select: 'name email' })
        .limit(limit)
        .skip(offset);
      const count: number = await this.hardSkillsModel.find({ skillType: skillTypes }).count();
      return { count, data: hardSkills }
    }
  }

  async findOne(id: string): Promise<HardSkill> {

    const hardSkill = await this.hardSkillsModel.findById(id).populate({ path: 'lastUpdateBy', select: 'name email' });
    if (!hardSkill) {
      throw new NotFoundException(`${id} not found`);
    }
    return hardSkill;
  }

  async update(id: string, updateHardSkillDto: UpdateHardSkillDto, user: User): Promise<HardSkill> {

    const hardSkillUpdated = await this.hardSkillsModel.findByIdAndUpdate(
      id,
      {
        ...updateHardSkillDto,
        updatedDate: new Date(),
        lastUpdateBy: user
      }, { new: true }).populate({ path: 'lastUpdateBy', select: 'name email' });

    if (!hardSkillUpdated) {
      throw new NotFoundException(`${id} not found`);
    }
    return hardSkillUpdated;

  }

  async remove(id: string, user: User): Promise<HardSkill> {
    return await this.update(id, { isVisible: false }, user);
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`"Hard skill" exists in db ${JSON.stringify(error.keyValue)}`)
    }
    if (error.status === 404) {
      throw new NotFoundException(error.response.message)
    }
    throw new InternalServerErrorException(`Can't create "hard skill" - Check server`);
  }


  async parseValidHardSkillsId(hardSkillsId: string[]): Promise<HardSkill[]> {
    let HardSkills: HardSkill[] = [];
    if (hardSkillsId) {
      for (const Id of hardSkillsId) {
        if (!isValidObjectId(Id)) {
          throw new BadRequestException(`One or more of sended "id hardSkills" are not valid`);
        }
        const harSkill = await this.hardSkillsModel.findById(Id);
        if (!harSkill) {
          throw new BadRequestException(`One or more of sended "hard" does not exist`);
        }
        HardSkills.push(harSkill);
      }

    }
    return HardSkills;
  }

}
