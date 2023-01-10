import { IsOptional, IsString } from "class-validator";

export class LanguagesDto {
    @IsString()
    @IsOptional()
    es: string;

    @IsString()
    @IsOptional()
    en: string;
}