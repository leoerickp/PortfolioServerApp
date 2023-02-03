import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CloudinaryModule } from 'nestjs-cloudinary';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    ConfigModule,
    CloudinaryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        isGlobal: true,
        cloud_name: configService.get<string>('cloudinaryCloudName'),
        api_key: configService.get<string>('cloudinaryApiKey'),
        api_secret: configService.get<string>('cloudinaryApiSecret'),
      }),
      inject: [ConfigService]
    })
  ]
})
export class FilesModule { }
