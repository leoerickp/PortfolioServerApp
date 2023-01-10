import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsString } from 'class-validator';
import { CreatePositionDto } from './create-position.dto';

export class UpdatePositionDto extends PartialType(CreatePositionDto) {
    @IsString()
    @IsMongoId()
    id: string;
}
