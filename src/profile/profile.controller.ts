import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto, UpdateProfileDto } from './dto/inputs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { Profile } from './entities/profile.entity';
import { DataResponse } from '../common/types/data-response';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Post()
  async create(
    @Body() createProfileDto: CreateProfileDto,
    @CurrentUser() user: User
  ): Promise<Profile> {
    return await this.profileService.create(createProfileDto, user);
  }

  @Get()
  async findAll(
    @CurrentUser() user: User
  ): Promise<DataResponse<Profile>> {
    return await this.profileService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseMongoIdPipe) id: string,
    @CurrentUser() user: User
  ): Promise<Profile> {
    return await this.profileService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @CurrentUser() user: User
  ): Promise<Profile> {
    return await this.profileService.update(id, updateProfileDto, user);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseMongoIdPipe) id: string,
    @CurrentUser() user: User
  ): Promise<boolean> {
    return await this.profileService.remove(id);
  }
}
