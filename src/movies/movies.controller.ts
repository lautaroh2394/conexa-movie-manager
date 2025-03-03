import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/constants';
import { Admin } from 'src/auth/decorators/admin.decorator';
import { RegularUser } from 'src/auth/decorators/regular.decorator';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}
    
    @Get()
    findAll(@Query() pagination: PaginationDto) {
        return this.moviesService.findAll(pagination)
    }

    @Get(':id')
    @RegularUser()
    async findOne(@Param('id') id: number) {
        return this.moviesService.findOne(id)
    }

    @Post()
    @Admin()
    create(@Body() createMovieDto: CreateMovieDto) {
        return this.moviesService.create(createMovieDto)
    }

    @Patch(':id')
    @Admin()
    update(
        @Param('id') id, 
        @Body() updateMovieDto: UpdateMovieDto
    ) {
        return this.moviesService.update(id, updateMovieDto)
    }

    @Delete(':id')
    @Admin()
    async delete(@Param('id') id: number) {
        await this.moviesService.delete(id)
        return;
    }
}
