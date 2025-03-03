import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { StarWarsModule } from 'src/starwars/starwars.module';

@Module({
  imports: [StarWarsModule],
  providers: [TasksService]
})
export class TasksModule {}
