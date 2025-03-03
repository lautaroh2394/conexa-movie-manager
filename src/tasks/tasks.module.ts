import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { StarWarsModule } from 'src/starwars/starwars.module';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [StarWarsModule, MoviesModule],
  providers: [TasksService]
})
export class TasksModule {}
