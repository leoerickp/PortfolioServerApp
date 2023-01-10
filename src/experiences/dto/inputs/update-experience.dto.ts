import { PartialType } from '@nestjs/mapped-types';
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateExperienceDto } from './create-experience.dto';
import { UpdatePositionDto } from '../../../positions/dto/inputs/update-position.dto';

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @IsOptional()
    updatePositions?: UpdatePositionDto[];
}
