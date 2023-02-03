import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseArrayPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/inputs';
import { ValidRolesArgs } from './dto/args/roles.arg';
import { PaginationArgs } from '../common/dto/args/pagination.args';
import { User } from './entities/user.entity';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user/current-user.decorator';
import { ValidRoles } from './enums/valid-roles.enums';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  //@Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(
    @Body() validRoles: ValidRolesArgs,
    @Query() pagination: PaginationArgs
  ): Promise<User[]> {
    return await this.usersService.findAll(validRoles, pagination);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseMongoIdPipe) id: string
  ): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: User
  ): Promise<User> {
    return await this.usersService.update(id, updateUserDto, user);
  }

  @Delete(':id')
  async blockUser(
    @Param('id', ParseMongoIdPipe) id: string,
    @CurrentUser([ValidRoles.admin]) user: User
  ): Promise<User> {
    return await this.usersService.block(id, user);
  }
}
