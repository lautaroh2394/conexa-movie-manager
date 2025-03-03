import { Injectable } from '@nestjs/common';
import { StarWarsResponseDto } from './dto/star-wars-response.dto';
import { SWAPI_ENDPOINT } from './constants';

@Injectable()
export class StarWarsService {
    async getMovies(){
        const res = await (await fetch(SWAPI_ENDPOINT)).json() as unknown as StarWarsResponseDto;
        const movies = res.results.map(movie => ({
                name: movie.title,
                description: movie.opening_crawl,
                director: movie.director,
                producer: movie.producer,
                releaseDate: movie.release_date
        }))

        return movies;
    }
}
