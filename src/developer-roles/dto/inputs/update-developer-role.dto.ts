import { PartialType } from '@nestjs/mapped-types';
import { CreateDeveloperRoleDto } from './create-developer-role.dto';

export class UpdateDeveloperRoleDto extends PartialType(CreateDeveloperRoleDto) {}
