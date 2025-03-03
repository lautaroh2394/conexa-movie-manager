import { Injectable } from '@nestjs/common';
import { StarWarsResponseDto } from './dto/star-wars-response.dto';
import { SWAPI_ENDPOINT } from './constants';
import { StarWarsMoviesDto } from './dto/star-wars-movies.dto';
import { CreateMovieDto } from 'src/movies/dto/create-movie.dto';

@Injectable()
export class StarWarsService {
    async getMovies(): Promise<CreateMovieDto[]>{
        const res = await (await fetch(SWAPI_ENDPOINT)).json() as unknown as StarWarsResponseDto;
        const movies = res.results.map((movie: StarWarsMoviesDto) => ({
                name: movie.title,
                description: movie.opening_crawl,
                director: movie.director,
                producer: movie.producer,
                releaseDate: movie.release_date
        } as CreateMovieDto))

        return movies;
    }
}
