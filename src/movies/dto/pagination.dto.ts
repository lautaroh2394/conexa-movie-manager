import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";
import { PAGINATION_LIMIT_DEFAULT, PAGINATION_OFFSET_DEFAULT } from "../constants";

export class PaginationDto {
    @ApiProperty({required: false, default: PAGINATION_LIMIT_DEFAULT})
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit: number;

    @ApiProperty({required: false, default: PAGINATION_OFFSET_DEFAULT})
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    offset: number;
}