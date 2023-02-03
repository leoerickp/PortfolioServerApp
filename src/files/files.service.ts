import { existsSync } from 'fs';
import { join } from 'path';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FilesService {

  getStaticImg(imageName: string) {
    const path = join(__dirname, '../../static/img/', imageName);
    if (!existsSync(path)) {
      throw new BadRequestException(`Personal photo ${imageName} does not exist`);
    }
    return path;
  }

  getStaticPhoto(imageName: string) {
    const path = join(__dirname, '../../static/photos/', imageName);
    if (!existsSync(path)) {
      throw new BadRequestException(`Photo ${imageName} does not exist`);
    }
    return path;
  }

}
