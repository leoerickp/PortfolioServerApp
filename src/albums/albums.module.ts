import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './entities/album.entity';
import { PhotosModule } from '../photos/photos.module';
import { PhotosService } from '../photos/photos.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, PhotosService],
  imports: [
    ConfigModule,

    MongooseModule.forFeature([
      {
        name: Album.name,
        schema: AlbumSchema
      }
    ]),
    PhotosModule
  ],
  exports: [
    MongooseModule,
    AlbumsModule
  ]
})
export class AlbumsModule { }
