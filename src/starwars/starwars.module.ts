import { Module } from '@nestjs/common';
import { StarWarsService } from './starwars.service';

@Module({
  providers: [StarWarsService],
  exports: [StarWarsService]
})
export class StarWarsModule {}
