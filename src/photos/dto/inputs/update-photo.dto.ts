import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsString } from 'class-validator';
import { CreatePhotoDto } from './create-photo.dto';

export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {
    @IsString()
    @IsMongoId()
    id: string;
}
