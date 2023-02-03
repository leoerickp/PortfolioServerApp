import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { CloudinaryService } from 'nestjs-cloudinary';
import { FilesService } from './files.service';
import { fileFilter, filePersonalPhotoNamer, filePhotoNamer } from './helpers';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  private hostAPI: string;
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
    private readonly cloudinaryService: CloudinaryService
  ) {
    this.hostAPI = this.configService.get<string>('hostAPI');
  }

  @Post('personalphoto')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    //limits: {fileSize:1000}
    storage: diskStorage({
      destination: './static/img',
      filename: filePersonalPhotoNamer
    })
  })) // file es la propiedad que se definió en postman
  uploadPersonalPhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException(`Image is not a valid format`);
    }
    const secureURL = `${this.hostAPI}/files/personalphoto/${file.filename}`;
    return { secureURL };

  }
  @Post('personalphoto/cloudinary')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter
  })) // file es la propiedad que se definió en postman
  async uploadPersonalPhotoToCloudinary(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Image is not a valid format');
    }
    const fileExtension = file.mimetype.split('/')[1];
    const fileName = `leoPhoto.${fileExtension}`;

    return await this.cloudinaryService.uploadFile(file,
      {
        folder: 'personalPhoto',
        filename_override: fileName,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      }
    );

  }

  @Post('photos/cloudinary')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter
  })) // file es la propiedad que se definió en postman
  async uploadPhotoToCloudinary(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Image is not a valid format');
    }
    return await this.cloudinaryService.uploadFile(file,
      {
        folder: 'Photos'
      }
    );

  }
  @Post('tmp')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter
  })) // file es la propiedad que se definió en postman
  async uploadTemporalToCloudinary(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException(`Image is not a valid format`);
    }
    return await this.cloudinaryService.uploadFile(file,
      {
        folder: 'tmp'
      }
    );

  }

  @Get('personalphoto/:imageName')
  findOnePersonalPhoto(
    @Res() res: Response, //Manulamente es la respuesta
    @Param('imageName') imageName: string
  ) {
    const path = this.filesService.getStaticImg(imageName);
    //res.status(403).json()
    res.sendFile(path);
  }

  @Post('photos')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    //limits: {fileSize:1000}
    storage: diskStorage({
      destination: './static/photos',
      filename: filePhotoNamer
    })
  })) // file es la propiedad que se definió en postman
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Image is not a valid format');
    }
    const secureURL = `${this.hostAPI}/files/photos/${file.filename}`;
    return { secureURL };

  }

  @Get('photos/:imageName')
  findOnePhoto(
    @Res() res: Response, //Manulamente es la respuesta
    @Param('imageName') imageName: string
  ) {
    const path = this.filesService.getStaticPhoto(imageName);

    res.sendFile(path);
  }

}
