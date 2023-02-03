import { Type } from 'class-transformer';
import { IsBoolean, IsMongoId, IsObject, IsOptional, IsString, IsUrl } from 'class-validator';
import { LanguagesDto } from '../../../common/dto/inputs/languages.dto';

export class CreatePhotoDto {

    @IsUrl()
    imgUrl: string;

    @IsObject()
    @IsOptional()
    @Type(() => LanguagesDto)
    description?: LanguagesDto;

    @IsMongoId()
    albumId: string;

    @IsBoolean()
    @IsOptional()
    isVisible?: boolean;
}
