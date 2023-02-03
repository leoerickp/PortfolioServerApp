import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/inputs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user/current-user.decorator';
import { Project } from './entities/project.entity';
import { DeveloperRolesService } from 'src/developer-roles/developer-roles.service';
import { HardSkillsService } from 'src/hard-skills/hard-skills.service';
import { PaginationArgs } from '../common/dto/args/pagination.args';
import { SearchArgs } from '../common/dto/args/search.args';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { DataResponse } from '../common/types/data-response';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly developerRolesService: DeveloperRolesService,
    private readonly hardSkillsService: HardSkillsService
  ) { }

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @CurrentUser() user: User
  ): Promise<Project> {
    return await this.projectsService.create(
      createProjectDto,
      {
        developerRolesId: await this.developerRolesService.parseValidRolesId(createProjectDto.developerRolesId),
        hardSkillsId: await this.hardSkillsService.parseValidHardSkillsId(createProjectDto.hardSkillsId)
      },
      user
    );
  }

  @Get()
  async findAll(
    @Query() pagination: PaginationArgs,
    @Query() search: SearchArgs,
  ): Promise<DataResponse<Project>> {
    return await this.projectsService.findAll(pagination, search);
  }

  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return await this.projectsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @CurrentUser() user: User
  ): Promise<Project> {
    return await this.projectsService.update(
      id,
      updateProjectDto,
      {
        developerRolesId: await this.developerRolesService.parseValidRolesId(updateProjectDto.developerRolesId),
        hardSkillsId: await this.hardSkillsService.parseValidHardSkillsId(updateProjectDto.hardSkillsId)
      },
      user
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: User
  ): Promise<Project> {
    return await this.projectsService.remove(id, user);
  }
}
