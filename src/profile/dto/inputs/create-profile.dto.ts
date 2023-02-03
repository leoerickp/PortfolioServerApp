import { Type } from "class-transformer";
import { IsDateString, IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, IsUrl, MinLength } from "class-validator";
import { LanguagesDto } from "src/common/dto/inputs/languages.dto";

export class CreateProfileDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name: string;

    @IsDateString()
    @IsNotEmpty()
    birthDate: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    englishLevel: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    cellphone: string;

    @IsString()
    @IsUrl()
    @IsNotEmpty()
    githubRepository: string;

    @IsString()
    @IsUrl()
    @IsNotEmpty()
    linkedIn: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    city: string;

    @IsString()
    @IsOptional()
    @IsUrl()
    facebook?: string;

    @IsString()
    @IsOptional()
    @IsUrl()
    imgUrl?: string;

    @IsObject()
    @IsNotEmptyObject()
    @Type(() => LanguagesDto)
    aboutMe: LanguagesDto;
}
