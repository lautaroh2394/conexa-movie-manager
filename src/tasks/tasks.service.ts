import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MoviesService } from 'src/movies/movies.service';
import { StarWarsService } from 'src/starwars/starwars.service';
import { TaskFail, TaskResults, TaskSuccess } from './types';
import { CreateMovieDto } from 'src/movies/dto/create-movie.dto';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name)
    constructor(
        private readonly starWarsService: StarWarsService,
        private readonly moviesService: MoviesService
    ){}

    @Cron(CronExpression.EVERY_12_HOURS)
    async updateMoviesFromStarWarsApi(): Promise<TaskResults>{
        this.logger.log("Starting Star Wars update...")
        const movies = await this.starWarsService.getMovies()
        const results = await Promise.allSettled(movies.map(movie => this.tryToCreate(movie)))
        this.logger.log("Star Wars update finished")
        return { 
            result:  results.reduce((prev, curr) => {
                const [name, success, message] = curr['value'];
                prev[name] = {success: success, message: message}
                return prev;
            }, {})
        }
    }

    private async tryToCreate(movie: CreateMovieDto): Promise<PromiseSettledResult<any>>{
        let result;
        try {
            const {id} = await this.moviesService.create(movie);
            result = [movie.name, TaskSuccess, `Created successfully (id ${id})`] ;
        }
        catch (e){
            result = [movie.name, TaskFail, e.message] ;
        }
        this.logger.log(result)
        return result;
    }
}
