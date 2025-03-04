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

@ApiBearerAuth()
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}
    
    @Get()
    @ApiOperation({description: 'Returns a list of movies. Every user can access this endpoint'})
    @ApiUnauthorizedResponseDoc()
    findAll(@Query() pagination: PaginationDto): Promise<Movie[]> {
        return this.moviesService.findAll(pagination)
    }

    @Get(':id')
    @RegularUser()
    @ApiOperation({description: 'Returns details for specific movie by id. Regular users can access this endpoint'})
    @ApiNotFoundResponseDoc()
    @ApiUnauthorizedResponseDoc()
    @ApiForbiddenResponseDoc()
    async findOne(@Param('id') id: number): Promise<Movie> {
        return this.moviesService.findOne(id)
    }

    @Post()
    @Admin()
    @ApiOperation({description: 'Creates a new movie. Admin users can access this endpoint'})
    @ApiUnauthorizedResponseDoc()
    @ApiForbiddenResponseDoc()
    create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
        return this.moviesService.create(createMovieDto)
    }

    @Patch(':id')
    @Admin()
    @ApiOperation({description: 'Updates an existing movie by id. Admin users can access this endpoint'})
    @ApiNotFoundResponseDoc()
    @ApiUnauthorizedResponseDoc()
    @ApiForbiddenResponseDoc()
    update(
        @Param('id') id, 
        @Body() updateMovieDto: UpdateMovieDto
    ): Promise<Movie> {
        return this.moviesService.update(id, updateMovieDto)
    }

    @Delete(':id')
    @Admin()
    @ApiOperation({description: 'Deletes an existing movie by id. Admin users can access this endpoint'})
    @ApiOkResponse({description: 'Does not return a body'})
    @ApiNotFoundResponseDoc()
    @ApiUnauthorizedResponseDoc()
    @ApiForbiddenResponseDoc()
    async delete(@Param('id') id: number): Promise<void> {
        await this.moviesService.delete(id)
        return;
    }
}
