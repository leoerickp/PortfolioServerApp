import { PartialType } from '@nestjs/mapped-types';
import { ArrayMinSize, IsArray, IsOptional } from 'class-validator';
import { CreateAlbumDto } from './create-album.dto';
import { UpdatePhotoDto } from '../../../photos/dto/inputs/update-photo.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
    @IsArray()
    @ArrayMinSize(1)
    @IsOptional()
    updatePhotos?: UpdatePhotoDto[];
}
