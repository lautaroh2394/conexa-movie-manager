import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Admin } from 'src/auth/decorators/admin.decorator';
import { TaskResult } from './types';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
    ) {}
    
    @Post('star-wars-update')
    @Admin()
    @HttpCode(HttpStatus.OK)
    starWarsUpdate(): Promise<TaskResult>{
        return this.tasksService.updateMoviesFromStarWarsApi()
    }
}
