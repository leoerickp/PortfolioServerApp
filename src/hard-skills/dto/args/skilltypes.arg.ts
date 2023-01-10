
import { IsArray, IsOptional, ArrayMinSize } from 'class-validator';
import { ValidSkillTypes } from '../../enums/valid-skilltypes.enum';

export class ValidSkillTypesArgs {

    @IsArray()
    @ArrayMinSize(1)
    @IsOptional()
    skillTypes?: ValidSkillTypes[];
}