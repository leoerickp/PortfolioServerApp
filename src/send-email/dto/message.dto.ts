import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";


export class MessageDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    subject: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    message: string;
}