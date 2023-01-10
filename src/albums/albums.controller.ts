import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PhotosService } from '../photos/photos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/inputs';
import { CurrentUser } from '../auth/decorators/current-user/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { PaginationArgs } from '../common/dto/args/pagination.args';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { Album } from './entities/album.entity';

@Controller('albums')
@UseGuards(JwtAuthGuard)
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly photosService: PhotosService
  ) { }

  @Post()
  async create(
    @Body() createAlbumDto: CreateAlbumDto,
    @CurrentUser() user: User
  ): Promise<Album> {
    const album = await this.albumsService.create(createAlbumDto, user);
    await this.photosService.createMany(createAlbumDto.insertPhotos, album, user);
    return album;
  }

  @Get()
  async findAll(
    @Query() pagination: PaginationArgs
  ): Promise<Album[]> {
    return await this.albumsService.findAll(pagination);
  }

  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string): Promise<Album> {
    return await this.albumsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @CurrentUser() user: User
  ): Promise<Album> {
    const { updatePhotos, insertPhotos } = updateAlbumDto;
    const album = await this.albumsService.update(id, updateAlbumDto, user);
    const promises = [];
    for (const photos of updatePhotos) {
      promises.push(this.photosService.update(photos.id, photos, user));
    }
    await Promise.all(promises);
    await this.photosService.createMany(insertPhotos, album, user)
    return album;
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: User
  ): Promise<Album> {
    return await this.albumsService.remove(id, user);
  }
}
