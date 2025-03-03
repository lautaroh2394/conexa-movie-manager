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
    releaseDate: string;
}
