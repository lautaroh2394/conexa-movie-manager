import { Injectable } from '@nestjs/common';
import { StarWarsResponseDto } from './dto/star-wars-response.dto';

@Injectable()
export class StarWarsService {
    private async getMovies(){
        const res = (await fetch('https://swapi.dev/api/')) as unknown as StarWarsResponseDto;
        const movies = res.results.map(movie => ({
                name: movie.title,
                description: movie.opening_crawl,
                director: movie.director,
                producer: movie.producer,
                releaseDate: movie.release_date
        }))
    }
}
