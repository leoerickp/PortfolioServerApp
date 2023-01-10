import { Type } from 'class-transformer';
import { IsBoolean, IsObject, IsOptional, IsString, MinLength, IsArray, ArrayMinSize, ValidateNested, IsNotEmptyObject, IsNotEmpty } from 'class-validator';
import { LanguagesDto } from '../../../common/dto/inputs/languages.dto';
import { CreatePositionDto } from '../../../positions/dto/inputs/create-position.dto';

export class CreateExperienceDto {

    @IsString()
    @MinLength(2)
    company: string;

    @IsObject()
    @IsNotEmptyObject()
    @Type(() => LanguagesDto)
    companyName: LanguagesDto;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    insertPositions: CreatePositionDto[];


    @IsBoolean()
    @IsOptional()
    isVisible?: boolean;

}
