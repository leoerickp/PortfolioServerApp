import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/inputs';
import { User } from '../users/entities/user.entity';
import { Album } from './entities/album.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationArgs } from '../common/dto/args/pagination.args';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AlbumsService {
  private defaultLimit: number;

  constructor(
    @InjectModel(Album.name)
    private readonly albumModel: Model<Album>,
    private readonly configService: ConfigService
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit'); // check env.config.ts
  }

  async create(createAlbumDto: CreateAlbumDto, user: User): Promise<Album> {
    try {
      const album = await this.albumModel.create({ ...createAlbumDto, lastUpdateBy: user });
      return album;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(pagination: PaginationArgs): Promise<Album[]> {
    const { limit = this.defaultLimit, offset = 0 } = pagination;
    const albums = await this.albumModel.find()
      .limit(limit)
      .skip(offset);
    return albums;
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.albumModel.findById(id);
    if (!album) {
      throw new NotFoundException(`${id} not found`);
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto, user: User): Promise<Album> {
    try {
      const album = await this.albumModel.findByIdAndUpdate(
        id,
        {
          ...updateAlbumDto,
          lastUpdateBy: user,
          updatedDate: new Date()
        },
        { new: true }
      );
      return album;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string, user: User): Promise<Album> {
    return this.update(id, { isVisible: false }, user);
  }

  private handleExceptions(error: any) {
    console.log(error);
    if (error.code === 11000) {
      throw new BadRequestException(`"Album" exists in db ${JSON.stringify(error.keyValue)}`)
    }
    if (error.status === 400) {
      throw new BadRequestException(error.response.message)
    }
    if (error.status === 404) {
      throw new NotFoundException(error.response.message)
    }
    throw new InternalServerErrorException(`Can't create "album" - Check server`);
  }
}
