import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePhotoDto, UpdatePhotoDto } from './dto/inputs';
import { Photo } from './entities/photo.entity';
import { Model } from 'mongoose';
import { User } from '../users/entities/user.entity';
import { PaginationArgs } from '../common/dto/args/pagination.args';
import { Album } from '../albums/entities/album.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PhotosService {
  private defaultLimit: number;

  constructor(
    @InjectModel(Photo.name)
    private readonly photosModel: Model<Photo>,
    private readonly configService: ConfigService
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit'); // check env.config.ts
  }


  async create(createPhotoDto: CreatePhotoDto, user: User): Promise<Photo> {
    try {
      const photo = await this.photosModel.create({ ...createPhotoDto, lastUpdateBy: user });
      return photo;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async createMany(createPhotoDtos: CreatePhotoDto[], album: Album, user: User): Promise<Photo[]> {
    try {
      const photos = await this.photosModel.insertMany(createPhotoDtos.map((photo) => {
        return { ...photo, lastUpdateBy: user, albumId: album }
      }));
      return photos;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(albumId: string, pagination: PaginationArgs): Promise<Photo[]> {
    const { limit = this.defaultLimit, offset = 0 } = pagination
    return await this.photosModel.find({ albumId })
      .limit(limit)
      .skip(offset)
      .populate('albumId')
      .populate('lastUpdateBy');
  }

  async findOne(id: string): Promise<Photo> {
    const photo = await this.photosModel.findById(id)
      .populate('albumId')
      .populate('lastUpdateBy');
    if (!photo) {
      throw new NotFoundException(`${id} not found`);
    }
    return photo;
  }

  async update(id: string, updatePhotoDto: UpdatePhotoDto, user: User): Promise<Photo> {
    try {
      const photo = await this.photosModel.findByIdAndUpdate(
        id,
        {
          ...updatePhotoDto,
          lastUpdateBy: user,
          updatedDate: new Date()
        },
        { new: true }
      )
        .populate('albumId')
        .populate('lastUpdateBy');
      return photo;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string, user: User): Promise<Photo> {
    return this.update(id, { id, isVisible: false }, user);
  }

  private handleExceptions(error: any) {
    console.log(error);
    if (error.code === 11000) {
      throw new BadRequestException(`"Photo" exists in db ${JSON.stringify(error.keyValue)}`)
    }
    if (error.status === 400) {
      throw new BadRequestException(error.response.message)
    }
    if (error.status === 404) {
      throw new NotFoundException(error.response.message)
    }
    throw new InternalServerErrorException(`Can't create "photo" - Check server`);
  }
}
