import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { createMock } from '@golevelup/ts-jest';
import { Movie } from './entities/movie.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('MoviesController', () => {
  let controller: MoviesController;
  let moviesService: MoviesService;

  const mockedMovie1 = {
        id: 1,
        name: 'movie 1',
        description: 'description 1',
        director: 'director 1',
        producer: 'producer 1',
        releaseDate: '1999-12-06'
  } as Movie
  const mockedMovie2 = {
    id: 2,
    name: 'movie 2',
    description: 'description 2',
    director: 'director 2',
    producer: 'producer 2',
    releaseDate: '1999-12-06'
} as Movie
  const mockedMovies = [ mockedMovie1, mockedMovie2]

  beforeEach(async () => {
    moviesService = createMock<MoviesService>()
    controller = new MoviesController(moviesService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', ()=>{
    it('returns a list of movies', async ()=>{
      const moviesServiceSpy = jest.spyOn(moviesService, 'findAll').mockResolvedValue(mockedMovies)
      const res = await controller.findAll({limit: 100, offset: 0})
      expect(moviesServiceSpy).toHaveBeenCalled()
      expect(res).toEqual(mockedMovies)
    })
  })

  describe('findOne', () => {
    it('returns a specific movie', async ()=>{
      const moviesServiceSpy = jest.spyOn(moviesService, 'findOne').mockResolvedValue(mockedMovie1)
      const res = await controller.findOne(1)
      expect(moviesServiceSpy).toHaveBeenCalled()
      expect(res).toEqual(mockedMovie1)
    })
  })

  describe('create', () => {
    it('creates and returns a movie', async ()=>{
      const moviesServiceSpy = jest.spyOn(moviesService, 'create').mockResolvedValue(mockedMovie1)
      const {id, ...data} = mockedMovie1;
      const res = await controller.create(data)
      expect(moviesServiceSpy).toHaveBeenCalled()
      expect(res).toEqual(mockedMovie1)
    })
    it('throws bad request due to duplicate movie', async ()=>{
      const moviesServiceSpy = jest.spyOn(moviesService, 'create').mockRejectedValue(new BadRequestException('Movie already exists'))
      const {id, ...data} = mockedMovie1;
      const res = controller.create(data)
      expect(moviesServiceSpy).toHaveBeenCalled()
      expect(res).rejects.toThrow(BadRequestException)
    })
  })

  describe('update', ()=>{
    it('updates and returns a movie', async ()=>{
      const mockedUpdatedMovieResponse = {...mockedMovie1, description: 'updated description'}
      const moviesServiceSpy = jest.spyOn(moviesService, 'update').mockResolvedValue(mockedUpdatedMovieResponse)
      const res = await controller.update(mockedMovie1.id, {...mockedMovie1, description: 'updated description'})
      expect(moviesServiceSpy).toHaveBeenCalled()
      expect(res).toEqual(mockedUpdatedMovieResponse)
    })
    it('throws not found when movie doesnt exist', async ()=>{
      const moviesServiceSpy = jest.spyOn(moviesService, 'update').mockRejectedValue(new NotFoundException())
      const res = controller.update(mockedMovie1.id, {...mockedMovie1, description: 'updated description'})
      expect(moviesServiceSpy).toHaveBeenCalled()
      expect(res).rejects.toThrow(NotFoundException)
    })
  })

  describe('delete', ()=>{
    it('deletes a movie', async ()=>{
      const moviesServiceSpy = jest.spyOn(moviesService, 'delete').mockResolvedValue(mockedMovie1)
      const res = await controller.delete(mockedMovie1.id)
      expect(moviesServiceSpy).toHaveBeenCalled()
      expect(res).not.toBeDefined()
    })
    it('throws not found when movie doesnt exist', async ()=>{
      const moviesServiceSpy = jest.spyOn(moviesService, 'delete').mockRejectedValue(new NotFoundException())
      const res = controller.delete(mockedMovie1.id)
      expect(moviesServiceSpy).toHaveBeenCalled()
      expect(res).rejects.toThrow(NotFoundException)
    })
  })
});
