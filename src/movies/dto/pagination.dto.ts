import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, Min } from "class-validator";
import { PAGINATION_LIMIT_DEFAULT, PAGINATION_OFFSET_DEFAULT } from "../constants";

export class PaginationDto {
    @ApiProperty({required: false, default: PAGINATION_LIMIT_DEFAULT})
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit: number;

    @ApiProperty({required: false, default: PAGINATION_OFFSET_DEFAULT})
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset: number;
}