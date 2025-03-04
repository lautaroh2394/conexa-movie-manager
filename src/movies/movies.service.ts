import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { PaginationDto } from './dto/pagination.dto';
import { PAGINATION_LIMIT_DEFAULT, PAGINATION_OFFSET_DEFAULT } from './constants';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>,
    ) {}

    async create(createMovieDto: CreateMovieDto): Promise<Movie>{
        try {
            const movie = this.movieRepository.create(createMovieDto)
            const res =  await this.movieRepository.save(movie)
            return res;
        } catch (e) {
            if (e['code'] === 'ER_DUP_ENTRY') throw new BadRequestException('Movie already exists')
            throw e;
        }
    }

    async findOne(id: number): Promise<Movie>{
        const movie = await this.movieRepository.findOne({ where: { id }});
        if (!movie) throw new NotFoundException()
        return movie;
    }

    findAll({ limit = PAGINATION_LIMIT_DEFAULT, offset = PAGINATION_OFFSET_DEFAULT }: PaginationDto): Promise<Movie[]>{
        return this.movieRepository.find({
            skip: offset,
            take: limit
        });
    }

    async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie>{
        const movieCount = await this.movieRepository.count({ where: {id}})
        const movieExists = movieCount === 0
        if (movieExists) throw new NotFoundException();
        await this.movieRepository.update(id, updateMovieDto)
        return this.findOne(id);
    }

    async delete(id: number): Promise<Movie>{
        const movie = await this.findOne(id);
        if (!movie) throw new NotFoundException()
        return this.movieRepository.remove(movie)
    }
}
