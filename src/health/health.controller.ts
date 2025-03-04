import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('health')
export class HealthController {
    @Get()
    @ApiOperation({description: 'Simple endpoint to check if service is online'})
    healthCheck(){
        return 'ok!'
    }
}
