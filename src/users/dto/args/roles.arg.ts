import { ArrayMinSize, IsArray, IsOptional } from "class-validator";
import { ValidRoles } from "src/users/enums/valid-roles.enums";

export class ValidRolesArgs {

    @IsArray()
    @ArrayMinSize(1)
    @IsOptional()
    roles?: ValidRoles[];

}