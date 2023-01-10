import { PartialType } from '@nestjs/mapped-types';
import { ArrayMinSize, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ValidRoles } from 'src/users/enums/valid-roles.enums';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsArray()
    @ArrayMinSize(1)
    @IsOptional()
    roles?: ValidRoles[];

    @IsOptional()
    isActive?: boolean;
}
