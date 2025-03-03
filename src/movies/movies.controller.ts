import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Admin } from 'src/auth/decorators/admin.decorator';
import { RegularUser } from 'src/auth/decorators/regular.decorator';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}
    
    @Get()
    findAll(@Query() pagination: PaginationDto): Promise<Movie[]> {
        return this.moviesService.findAll(pagination)
    }

    @Get(':id')
    @RegularUser()
    async findOne(@Param('id') id: number): Promise<Movie> {
        return this.moviesService.findOne(id)
    }

    @Post()
    @Admin()
    create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
        return this.moviesService.create(createMovieDto)
    }

    @Patch(':id')
    @Admin()
    update(
        @Param('id') id, 
        @Body() updateMovieDto: UpdateMovieDto
    ): Promise<Movie> {
        return this.moviesService.update(id, updateMovieDto)
    }

    @Delete(':id')
    @Admin()
    async delete(@Param('id') id: number): Promise<void> {
        await this.moviesService.delete(id)
        return;
    }
}
