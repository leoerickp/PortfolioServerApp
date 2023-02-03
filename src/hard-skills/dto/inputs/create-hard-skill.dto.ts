import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsPositive, IsString, IsUrl, Max, Min, MinLength } from "class-validator";
import { LanguagesDto } from "../../../common/dto/inputs/languages.dto";
import { ValidSkillTypes } from "src/hard-skills/enums/valid-skilltypes.enum";

export class CreateHardSkillDto {
    @IsString()
    @MinLength(2)
    technology: string;

    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(10)
    selfRate?: number;

    @IsInt()
    @IsOptional()
    @Min(0)
    amountPrjs?: number;

    @IsUrl()
    @IsOptional()
    imgUrl?: string;

    @IsArray()
    @ArrayMinSize(1)
    @IsOptional()
    @Type(() => LanguagesDto)
    knowledges?: LanguagesDto[];

    @IsBoolean()
    @IsOptional()
    isVisible?: boolean;

    @IsString()
    @IsEnum(ValidSkillTypes)
    @IsOptional()
    skillType?: ValidSkillTypes;
}
