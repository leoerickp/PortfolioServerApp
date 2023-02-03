import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { HardSkillsService } from './hard-skills.service';
import { CreateHardSkillDto, UpdateHardSkillDto } from './dto/inputs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { HardSkill } from './entities/hard-skill.entity';
import { ValidSkillTypesArgs } from './dto/args/skilltypes.arg';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { DataResponse } from '../common/types/data-response';

@Controller('hard-skills')
@UseGuards(JwtAuthGuard)
export class HardSkillsController {
  constructor(private readonly hardSkillsService: HardSkillsService) { }

  @Post()
  async create(
    @Body() createHardSkillDto: CreateHardSkillDto,
    @CurrentUser() user: User
  ): Promise<HardSkill> {
    return await this.hardSkillsService.create(createHardSkillDto, user);
  }

  @Get()
  async findAll(
    @Body() Types: ValidSkillTypesArgs,
    @Query() pagination: PaginationArgs,
  ): Promise<DataResponse<HardSkill>> {
    return await this.hardSkillsService.findAll(Types.skillTypes, pagination);
  }

  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string): Promise<HardSkill> {
    return await this.hardSkillsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateHardSkillDto: UpdateHardSkillDto,
    @CurrentUser() user: User
  ): Promise<HardSkill> {
    return await this.hardSkillsService.update(id, updateHardSkillDto, user);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseMongoIdPipe) id: string,
    @CurrentUser() user: User
  ) {
    return await this.hardSkillsService.remove(id, user);
  }
}
