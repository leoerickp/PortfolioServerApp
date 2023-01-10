import { ArrayMinSize, IsArray, IsBoolean, IsDateString, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, MinLength } from "class-validator";
import { LanguagesDto } from "../../../common/dto/inputs/languages.dto";

export class CreateProjectDto {
    @IsString()
    @MinLength(3)
    projectName: string;

    @IsObject()
    @IsNotEmptyObject()
    projectTitle: LanguagesDto;

    @IsObject()
    @IsOptional()
    @IsNotEmptyObject()
    company?: LanguagesDto;

    @IsDateString()
    projectDate: string;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    developerRolesId: string[];

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    hardSkillsId: string[];

    @IsObject()
    @IsNotEmptyObject()
    summary: LanguagesDto;

    @IsBoolean()
    @IsOptional()
    isVisible?: boolean;
}
