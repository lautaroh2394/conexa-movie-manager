import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsString } from "class-validator";

export class CreateMovieDto {
    @IsString()
    name: string;

    @IsString()
    description: string;
    
    @IsString()
    director: string;

    @IsString()
    producer: string;

    @IsDateString()
    @ApiProperty({ example: '1988-12-04'})
    releaseDate: string;
}
