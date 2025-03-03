import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Admin } from 'src/auth/decorators/admin.decorator';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
    ) {}
    
    @Post('star-wars-update')
    @Admin()
    @HttpCode(HttpStatus.OK)
    starWarsUpdate(){
        return this.tasksService.updateMoviesFromStarWarsApi()
    }
}
