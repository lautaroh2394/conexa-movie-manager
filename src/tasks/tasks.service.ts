import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MoviesService } from 'src/movies/movies.service';
import { StarWarsService } from 'src/starwars/starwars.service';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name)
    constructor(
        private readonly starWarsService: StarWarsService,
        private readonly moviesService: MoviesService
    ){}

    @Cron(CronExpression.EVERY_12_HOURS)
    async updateMoviesFromStarWarsApi(){
        this.logger.log("Starting Star Wars update...")
        const movies = await this.starWarsService.getMovies()
        const results = await Promise.allSettled(movies.map(movie => this.tryToCreate(movie)))
        this.logger.log("Star Wars update finished")
        return { 
            result: results.map((m: PromiseSettledResult<any>) => m["value"])
        }
    }

    private async tryToCreate(movie){
        let result;
        try {
            await this.moviesService.create(movie);
            result = `${movie.name} created successfully`;
        }
        catch (e){
            result = `${movie.name}: ${e.message}`
        }
        this.logger.log(result)
        return result;
    }
}
