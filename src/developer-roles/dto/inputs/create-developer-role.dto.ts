import { IsString, MinLength } from "class-validator";

export class CreateDeveloperRoleDto {
    @IsString()
    @MinLength(2)
    roleName: string;

}
