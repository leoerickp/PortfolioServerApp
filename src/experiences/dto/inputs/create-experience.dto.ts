import { Type } from 'class-transformer';
import { IsBoolean, IsObject, IsOptional, IsString, MinLength, IsArray, ArrayMinSize, ValidateNested, IsNotEmptyObject, IsNotEmpty } from 'class-validator';
import { LanguagesDto } from '../../../common/dto/inputs/languages.dto';

export class CreateExperienceDto {

    @IsString()
    @MinLength(2)
    company: string;

    @IsObject()
    @IsNotEmptyObject()
    @Type(() => LanguagesDto)
    companyName: LanguagesDto;

    @IsBoolean()
    @IsOptional()
    isVisible?: boolean;

}
