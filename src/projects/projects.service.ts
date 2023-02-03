import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProjectDto, UpdateProjectDto } from './dto/inputs';
import { Project } from './entities/project.entity';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { PaginationArgs } from '../common/dto/args/pagination.args';
import { SearchArgs } from '../common/dto/args/search.args';
import { searchTransform } from '../common/helpers/search-transform';
import { ConfigService } from '@nestjs/config';
import { DataResponse } from '../common/types/data-response';

@Injectable()
export class ProjectsService {

  private defaultLimit: number;

  constructor(
    @InjectModel(Project.name)
    private readonly projectsModel: Model<Project>,
    private readonly configService: ConfigService
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit'); // check env.config.ts
  }

  async create(createProjectDto: CreateProjectDto, { developerRolesId, hardSkillsId }, user: User): Promise<Project> {

    try {
      const project = await this.projectsModel.create(
        {
          ...createProjectDto,
          lastUpdateBy: user,
          developerRolesId,
          hardSkillsId
        });

      return project;

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(pagination: PaginationArgs, searchArgs: SearchArgs): Promise<DataResponse<Project>> {
    const { limit = this.defaultLimit, offset = 0 } = pagination;
    const { search } = searchArgs;

    if (search) {
      const searchArr = searchTransform(search);
      // TODO: Mejorar las búsquedas por otros campos
      const projects: Project[] = await this.projectsModel.find({
        $or: searchArr.map(e => {
          return { projectName: { "$regex": e.trim(), "$options": "i" } }
        })
      })
        .populate({ path: 'lastUpdateBy', select: 'name email' })
        .populate('developerRolesId')
        .populate('hardSkillsId')
        .limit(limit)
        .skip(offset);
      const count: number = await this.projectsModel.find({
        $or: searchArr.map(e => {
          return { projectName: { "$regex": e.trim(), "$options": "i" } }
        })
      }).count();
      return { count, data: projects }
    }
    else {
      const projects: Project[] = await this.projectsModel.find().populate({ path: 'lastUpdateBy', select: 'name email' })
        .populate({ path: 'lastUpdateBy', select: 'name email' })
        .populate('developerRolesId')
        .populate('hardSkillsId')
        .limit(limit)
        .skip(offset);
      const count: number = await this.projectsModel.find().count();
      return { count, data: projects }
    }
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectsModel.findById(id)
      .populate({ path: 'lastUpdateBy', select: 'name email' })
      .populate('developerRolesId')
      .populate('hardSkillsId');
    if (!project) {
      throw new NotFoundException(`${id} not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, { developerRolesId, hardSkillsId }, user: User): Promise<Project> {
    try {
      if (developerRolesId.length > 0 && hardSkillsId.Length > 0) {
        return await this.projectsModel.findByIdAndUpdate(
          id,
          {
            ...updateProjectDto,
            lastUpdateBy: user,
            developerRolesId,
            hardSkillsId,
            updatedDate: new Date()
          },
          { new: true })
          .populate({ path: 'lastUpdateBy', select: 'name email' })
          .populate('developerRolesId')
          .populate('hardSkillsId');

      }
      if (developerRolesId.length > 0) {
        return await this.projectsModel.findByIdAndUpdate(
          id,
          {
            ...updateProjectDto,
            lastUpdateBy: user,
            developerRolesId,
            updatedDate: new Date()
          },
          { new: true })
          .populate({ path: 'lastUpdateBy', select: 'name email' })
          .populate('developerRolesId')
          .populate('hardSkillsId');

      }
      if (hardSkillsId.length > 0) {
        return await this.projectsModel.findByIdAndUpdate(
          id,
          {
            ...updateProjectDto,
            lastUpdateBy: user,
            hardSkillsId,
            updatedDate: new Date()
          },
          { new: true })
          .populate({ path: 'lastUpdateBy', select: 'name email' })
          .populate('developerRolesId')
          .populate('hardSkillsId');

      }

      return await this.projectsModel.findByIdAndUpdate(
        id,
        {
          ...updateProjectDto,
          lastUpdateBy: user,
          updatedDate: new Date()
        },
        { new: true })
        .populate({ path: 'lastUpdateBy', select: 'name email' })
        .populate('developerRolesId')
        .populate('hardSkillsId');

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string, user: User): Promise<Project> {
    //return await this.update(id, { isVisible: false }, { developerRolesId: [], hardSkillsId: [] }, user);
    try {
      const project = await this.projectsModel.findByIdAndDelete(id);
      return project;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`"Project" exists in db ${JSON.stringify(error.keyValue)}`)
    }
    if (error.status === 400) {
      throw new BadRequestException(error.response.message)
    }
    if (error.status === 404) {
      throw new NotFoundException(error.response.message)
    }
    throw new InternalServerErrorException(`Can't create "project" - Check server`);
  }

}
