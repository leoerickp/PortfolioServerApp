import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, MinLength, IsObject } from 'class-validator';
import { LanguagesDto } from '../../../common/dto/inputs/languages.dto';

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

}
