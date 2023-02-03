import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto, UpdateExperienceDto } from './dto/inputs';
import { PositionsService } from '../positions/positions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { PaginationArgs } from '../common/dto/args/pagination.args';
import { SearchArgs } from '../common/dto/args/search.args';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { Experience } from './entities/experience.entity';
import { DataResponse } from '../common/types/data-response';

@Controller('experiences')
@UseGuards(JwtAuthGuard)
export class ExperiencesController {
  constructor(
    private readonly experiencesService: ExperiencesService,
    private readonly positionsService: PositionsService
  ) { }

  @Post()
  async create(
    @Body() createExperienceDto: CreateExperienceDto,
    @CurrentUser() user: User
  ): Promise<Experience> {
    const experience = await this.experiencesService.create(createExperienceDto, user);
    //await this.positionsService.createMany(createExperienceDto.insertPositions, experience, user);
    return experience;

  }

  @Get()
  async findAll(
    @Query() pagination: PaginationArgs,
    @Query() search: SearchArgs,
  ): Promise<DataResponse<Experience>> {
    return await this.experiencesService.findAll(pagination, search);
  }

  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string): Promise<Experience> {
    return this.experiencesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
    @CurrentUser() user: User
  ): Promise<Experience> {
    //const { insertPositions, updatePositions } = updateExperienceDto;
    const experience = await this.experiencesService.update(id, updateExperienceDto, user);
    /*const promises = []
    for (const updatePosition of updatePositions) {
      promises.push(this.positionsService.update(updatePosition.id, updatePosition, user));
    }
    await Promise.all(promises);
    await this.positionsService.createMany(insertPositions, experience, user);*/
    return experience;
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseMongoIdPipe) id: string,
    @CurrentUser() user: User
  ): Promise<Experience> {
    return await this.experiencesService.remove(id, user);
  };
}
