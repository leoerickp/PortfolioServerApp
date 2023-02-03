
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional } from 'class-validator';
import { LanguagesDto } from '../../../common/dto/inputs/languages.dto';
import { DateDto } from './date.dto';

export class CreatePositionDto {
    @IsObject()
    @Type(() => LanguagesDto)
    positionName: LanguagesDto;

    @IsObject()
    @IsNotEmptyObject()
    @Type(() => DateDto)
    date: DateDto;

    @IsArray()
    @ArrayMinSize(1)
    @Type(() => LanguagesDto)
    achievements: LanguagesDto[];

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    hardSkillsId: string[];

    @IsMongoId()
    experienceId: string;

    @IsBoolean()
    @IsOptional()
    isVisible?: boolean;
}
