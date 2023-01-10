import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Photo, PhotoSchema } from './entities/photo.entity';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Photo.name,
        schema: PhotoSchema
      }
    ])
  ],
  exports: [
    MongooseModule,
    PhotosModule
  ]
})
export class PhotosModule { }
