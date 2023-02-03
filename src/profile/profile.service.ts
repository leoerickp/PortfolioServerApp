import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProfileDto, UpdateProfileDto } from './dto/inputs';
import { Profile } from './entities/profile.entity';
import { User } from '../users/entities/user.entity';
import { DataResponse } from 'src/common/types/data-response';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<Profile>
  ) { }
  async create(createProfileDto: CreateProfileDto, user: User): Promise<Profile> {
    try {
      const profile = await this.profileModel.create({ ...createProfileDto, lastUpdateBy: user });
      return profile;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(): Promise<DataResponse<Profile>> {
    const profiles: Profile[] = await this.profileModel.find().populate({ path: 'lastUpdateBy', select: 'name email' });
    const count: number = await this.profileModel.find().count();
    return { count, data: profiles }
  }

  async findOne(id: string): Promise<Profile> {
    const profile = await this.profileModel.findById(id).populate({ path: 'lastUpdateBy', select: 'name email' });
    if (!profile) {
      throw new NotFoundException(`${id} not found`);
    }
    return profile;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto, user: User): Promise<Profile> {
    const profileUpdated = await this.profileModel.findByIdAndUpdate(
      id,
      {
        ...updateProfileDto,
        updatedDate: new Date(),
        lastUpdateBy: user
      }, { new: true }).populate({ path: 'lastUpdateBy', select: 'name email' });

    if (!profileUpdated) {
      throw new NotFoundException(`${id} not found`);
    }
    return profileUpdated;
  }

  async remove(id: string): Promise<boolean> {
    try {
      const result = await this.profileModel.findByIdAndRemove(id);
      if (!result) {
        throw new NotFoundException(`${id} not found in db`);
      }
      return !!result;

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`"Profile" exists in db ${JSON.stringify(error.keyValue)}`)
    }
    if (error.status === 400) {
      throw new BadRequestException(error.response.message)
    }
    if (error.status === 404) {
      throw new NotFoundException(error.response.message)
    }
    throw new InternalServerErrorException(`Can't create "profile" - Check server`);
  }
}
