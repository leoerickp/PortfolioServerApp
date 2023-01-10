import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DeveloperRolesService } from './developer-roles.service';
import { CreateDeveloperRoleDto, UpdateDeveloperRoleDto } from './dto/inputs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { DeveloperRole } from './entities/developer-role.entity';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('developer-roles')
@UseGuards(JwtAuthGuard)
export class DeveloperRolesController {
  constructor(
    private readonly developerRolesService: DeveloperRolesService,
  ) { }

  @Post()
  async create(
    @Body() createDeveloperRoleDto: CreateDeveloperRoleDto,
    @CurrentUser() user: User
  ): Promise<DeveloperRole> {
    return await this.developerRolesService.create(createDeveloperRoleDto, user);
  }

  @Get()
  async findAll(): Promise<DeveloperRole[]> {
    return await this.developerRolesService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseMongoIdPipe) id: string
  ): Promise<DeveloperRole> {
    return await this.developerRolesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string, @Body() updateDeveloperRoleDto: UpdateDeveloperRoleDto,
    @CurrentUser() user: User
  ) {
    return await this.developerRolesService.update(id, updateDeveloperRoleDto, user);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseMongoIdPipe) id: string
  ): Promise<boolean> {
    return this.developerRolesService.remove(id);
  }
}
