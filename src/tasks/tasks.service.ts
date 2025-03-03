import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { StarWarsService } from 'src/starwars/starwars.service';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name)
    constructor(private readonly starWarsService: StarWarsService){}

    @Cron(CronExpression.EVERY_5_SECONDS)
    updateMoviesFromStarWarsApi(){
        this.logger.log("Starting Star Wars update...")

    }
}
