import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Admin } from './../../src/auth/decorators/admin.decorator';
import { RegularUser } from './../../src/auth/decorators/regular.decorator';
import { Movie } from './entities/movie.entity';
import { ApiUnauthorizedResponseDoc } from './../../src/auth/doc/api-unauthorized.decorator';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiNotFoundResponseDoc } from './doc/api-not-found.decorator';
import { ApiForbiddenResponseDoc } from './doc/api-forbidden.decorator';
import { FindAllMovieDocs } from './doc/find-all-movie-docs.decorator';
import { FindOneMovieDocs } from './doc/find-one-movie-docs.decorator';
import { CreateMovieDocs } from './doc/create-movie-docs.decorator';
import { UpdateMovieDocs } from './doc/update-movie-docs.decorator';
import { DeleteMovieDocs } from './doc/delete-movie-docs.decorator';

@ApiBearerAuth()
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}
    
    @Get()
    @FindAllMovieDocs()
    findAll(@Query() pagination: PaginationDto): Promise<Movie[]> {
        return this.moviesService.findAll(pagination)
    }

    @Get(':id')
    @RegularUser()
    @FindOneMovieDocs()
    async findOne(@Param('id') id: number): Promise<Movie> {
        return this.moviesService.findOne(id)
    }

    @Post()
    @Admin()
    @CreateMovieDocs()
    create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
        return this.moviesService.create(createMovieDto)
    }

    @Patch(':id')
    @Admin()
    @UpdateMovieDocs()
    update(
        @Param('id') id, 
        @Body() updateMovieDto: UpdateMovieDto
    ): Promise<Movie> {
        return this.moviesService.update(id, updateMovieDto)
    }

    @Delete(':id')
    @Admin()
    @DeleteMovieDocs()
    async delete(@Param('id') id: number): Promise<void> {
        await this.moviesService.delete(id)
        return;
    }
}
