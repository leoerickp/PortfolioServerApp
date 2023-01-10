import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto, UpdatePhotoDto } from './dto/inputs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { PaginationArgs } from '../common/dto/args/pagination.args';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { Photo } from './entities/photo.entity';

@Controller('photos')
@UseGuards(JwtAuthGuard)
export class PhotosController {
  constructor(private readonly photosService: PhotosService) { }

  //@Post()
  async create(
    @Body() createPhotoDto: CreatePhotoDto,
    @CurrentUser() user: User
  ): Promise<Photo> {
    return await this.photosService.create(createPhotoDto, user);
  }

  @Get('byAlbum/:albumId')
  //Todo: mejorar el filtro
  async findAll(
    @Param('albumId', ParseMongoIdPipe) albumId: string,
    @Query() pagination: PaginationArgs
  ): Promise<Photo[]> {
    return await this.photosService.findAll(albumId, pagination);
  }


  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string): Promise<Photo> {
    return await this.photosService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updatePhotoDto: UpdatePhotoDto,
    @CurrentUser() user: User
  ): Promise<Photo> {
    return await this.photosService.update(id, updatePhotoDto, user);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseMongoIdPipe) id: string,
    @CurrentUser() user: User
  ): Promise<Photo> {
    return await this.photosService.remove(id, user);
  }
}
