import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto, UpdatePositionDto } from './dto/inputs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user/current-user.decorator';
import { PaginationArgs } from '../common/dto/args/pagination.args';
import { SearchArgs } from '../common/dto/args/search.args';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { Position } from './entities/position.entity';
import { User } from '../users/entities/user.entity';

@Controller('positions')
@UseGuards(JwtAuthGuard)
export class PositionsController {
  constructor(
    private readonly positionsService: PositionsService,
  ) { }

  //@Post()
  async create(
    @Body() createPositionDto: CreatePositionDto,
    @CurrentUser() user: User
  ): Promise<Position> {
    return await this.positionsService.create(createPositionDto, user);
  }

  @Get('byExperience/:experienceId')
  async findAll(
    @Param('experienceId', ParseMongoIdPipe) experienceId: string,
    @Query() pagination: PaginationArgs,
    @Query() search: SearchArgs,
  ): Promise<Position[]> {
    return await this.positionsService.findAll(experienceId, pagination, search);
  }

  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string): Promise<Position> {
    return await this.positionsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updatePositionDto: UpdatePositionDto,
    @CurrentUser() user: User
  ): Promise<Position> {
    return await this.positionsService.update(id, updatePositionDto, user);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseMongoIdPipe) id: string,
    @CurrentUser() user: User
  ) {
    return await this.positionsService.remove(id, user);
  }
}
