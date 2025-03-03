import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MoviesModule, 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: 'root',
      database: 'movies-db',
      port: 3306,
      entities: ['dist/**/*.entity.js'],
      synchronize: false,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
