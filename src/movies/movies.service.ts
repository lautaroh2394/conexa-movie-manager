import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>,
    ) {}

    async create(createMovieDto: CreateMovieDto){
        const movie = this.movieRepository.create(createMovieDto)
        return this.movieRepository.save(movie)
    }

    async findOne(id: number){
        const movie = await this.movieRepository.findOne({ where: { id }});
        if (!movie) throw new NotFoundException()
        return movie;
    }

    findAll({ limit = 10, offset = 0 }: PaginationDto){
        return this.movieRepository.find({
            skip: offset,
            take: limit
        });
    }

    async update(id: number, updateMovieDto: UpdateMovieDto){
        const movieCount = await this.movieRepository.count({ where: {id}})
        const movieExists = movieCount > 0
        if (movieExists) throw new NotFoundException();
        await this.movieRepository.update(id, updateMovieDto)
        return this.findOne(id);
    }

    async delete(id: number){
        const movie = await this.findOne(id);
        if (!movie) throw new NotFoundException()
        return this.movieRepository.remove(movie)
    }
}
