import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { StarWarsModule } from './starwars/starwars.module';
import { HealthModule } from './health/health.module';

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
  }), 
    AuthModule, 
    UsersModule,
    ScheduleModule.forRoot(),
    TasksModule,
    StarWarsModule,
    HealthModule
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
