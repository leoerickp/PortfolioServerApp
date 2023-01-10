import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class DateDto {
    @IsDateString()
    @IsOptional()
    from?: string;

    @IsDateString()
    @IsOptional()
    to?: string;
}