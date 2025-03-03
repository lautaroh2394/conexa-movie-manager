import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}
    
    @Get()
    findAll() {
        return "findall movies"
    }

    @Get(':id')
    findOne() {

    }

    @Post()
    create(@Body() createMovieDto: CreateMovieDto) {

    }

    @Patch(':id')
    update(@Body() updateMovieDto: UpdateMovieDto) {

    }

    @Delete(':id')
    delete() {

    }
}
