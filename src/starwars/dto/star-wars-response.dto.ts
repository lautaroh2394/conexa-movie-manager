import { StarWarsMoviesDto } from "./star-wars-movies.dto";

export class StarWarsResponseDto {
    count: number;
    next: any;
    previos: any;
    results: StarWarsMoviesDto[];
}