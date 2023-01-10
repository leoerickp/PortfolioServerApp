import { PartialType } from '@nestjs/mapped-types';
import { CreateHardSkillDto } from './create-hard-skill.dto';

export class UpdateHardSkillDto extends PartialType(CreateHardSkillDto) {}
