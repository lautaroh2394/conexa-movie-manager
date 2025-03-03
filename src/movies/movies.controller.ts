import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}
    
    @Get()
    findAll(@Query() pagination: PaginationDto) {
        return this.moviesService.findAll(pagination)
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.moviesService.findOne(id)
    }

    @Post()
    create(@Body() createMovieDto: CreateMovieDto) {
        return this.moviesService.create(createMovieDto)
    }

    @Patch(':id')
    update(
        @Param('id') id, 
        @Body() updateMovieDto: UpdateMovieDto
    ) {
        return this.moviesService.update(id, updateMovieDto)
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.moviesService.delete(id)
    }
}
