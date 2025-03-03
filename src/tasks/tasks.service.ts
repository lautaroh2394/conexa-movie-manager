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

    @Cron(CronExpression.EVERY_5_SECONDS)
    async updateMoviesFromStarWarsApi(){
        this.logger.log("Starting Star Wars update...")
        const movies = await this.starWarsService.getMovies()
        await Promise.allSettled(movies.map(async (movie) => {
            try {
                await this.moviesService.create(movie);
                this.logger.log(`${movie.name} created successfully`)
            }
            catch (e){
                if (e.code === 'ER_DUP_ENTRY') this.logger.log(`${movie.name} already exists`)
                else this.logger.error(`An error ocurred when creating ${movie.name}: ${e}`);
            }
        }))
        this.logger.log("Star Wars update finished")
    }
}
