import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, MinLength, IsObject, IsArray, ArrayMinSize } from 'class-validator';
import { LanguagesDto } from '../../../common/dto/inputs/languages.dto';
import { CreatePhotoDto } from '../../../photos/dto/inputs';

export class CreateAlbumDto {

    @IsString()
    @MinLength(2)
    albumName: string;

    @IsObject()
    @IsOptional()
    @Type(() => LanguagesDto)
    description?: LanguagesDto;

    @IsBoolean()
    @IsOptional()
    isVisible?: boolean;

    @IsArray()
    @ArrayMinSize(1)
    insertPhotos: CreatePhotoDto[];
}
