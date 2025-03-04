import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('health')
export class HealthController {
    @Get()
    @Public()
    @ApiOperation({description: 'Simple endpoint to check if service is online'})
    healthCheck(){
        return 'ok!'
    }
}
