import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationArgs {


    @IsInt()
    @IsOptional()
    @IsPositive()
    @Min(1)
    @Type(() => Number) ///enableImplicitConvertion:true, main.ts
    limit?: number;

    @IsInt()
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset?: number;
}