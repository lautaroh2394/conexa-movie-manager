import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Admin } from './../../src/auth/decorators/admin.decorator';
import { TaskResults } from './types';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiUnauthorizedResponseDoc } from './../../src/auth/doc/api-unauthorized.decorator';
import { ApiForbiddenResponseDoc } from './../../src/movies/doc/api-forbidden.decorator';
import { ApiOkResponseDoc } from './doc/api-ok-response-doc.decorator';
import { StarWarsUpdateDocs } from './update-doc.decorator';

@Controller('tasks')
@ApiBearerAuth()
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
    ) {}
    
    @Post('star-wars-update')
    @Admin()
    @HttpCode(HttpStatus.OK)
    @StarWarsUpdateDocs()
    starWarsUpdate(): Promise<TaskResults>{
        return this.tasksService.updateMoviesFromStarWarsApi()
    }
}
