import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { createMock } from '@golevelup/ts-jest';
import { QueryFailedError } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';


describe('MoviesService', () => {
  let service: MoviesService;
  let movieRepository: Repository<Movie>;
  const mockedMovie1: Movie = {
    id: 1,
    name: 'movie 1',
    description: 'description 1',
    director: 'director 1',
    producer: 'producer 1',
    releaseDate: '1999-12-06'
} as Movie
  const mockedMovie2: Movie = {
    id: 2,
    name: 'movie 2',
    description: 'description 2',
    director: 'director 2',
    producer: 'producer 2',
    releaseDate: '1999-12-06'
  } as Movie
  const mockedMovies = [ mockedMovie1, mockedMovie2]

  beforeEach(async () => {
    movieRepository = createMock<Repository<Movie>>()
    service = new MoviesService(movieRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', ()=>{
    it('should create a movie and return it', async ()=>{
      const movieRepositorySpyCreate = jest.spyOn(movieRepository, 'create').mockImplementation(() => mockedMovie1)
      const movieRepositorySpySave = jest.spyOn(movieRepository, 'save').mockResolvedValue(mockedMovie1)
      const {id, ...data} = mockedMovie1;
      const res = await service.create(data)
      expect(movieRepositorySpyCreate).toHaveBeenCalled()
      expect(movieRepositorySpySave).toHaveBeenCalled()
      expect(res).toEqual(mockedMovie1)
    })
    it('should throw bad request due to duplicate movie', async ()=>{
      const movieRepositorySpyCreate = jest.spyOn(movieRepository, 'create').mockImplementation(() => mockedMovie1)
      const movieRepositorySpySave = jest.spyOn(movieRepository, 'save').mockRejectedValue(
        {code: 'ER_DUP_ENTRY'} as any as QueryFailedError
      )
      const {id, ...data} = mockedMovie1;
      const res = service.create(data)
      expect(movieRepositorySpyCreate).toHaveBeenCalled()
      expect(movieRepositorySpySave).toHaveBeenCalled()
      expect(res).rejects.toThrow(BadRequestException)
    })
    it('should throw a different exception if arised', async ()=>{
      const movieRepositorySpyCreate = jest.spyOn(movieRepository, 'create').mockImplementation(() => mockedMovie1)
      const movieRepositorySpySave = jest.spyOn(movieRepository, 'save').mockRejectedValue(new Error())
      const {id, ...data} = mockedMovie1;
      const res = service.create(data)
      expect(movieRepositorySpyCreate).toHaveBeenCalled()
      expect(movieRepositorySpySave).toHaveBeenCalled()
      expect(res).rejects.toThrow(Error)
    })
  })

  describe('findOne', ()=>{
    it('should return found movie', async ()=>{
      const movieRepositorySpy = jest.spyOn(movieRepository, 'findOne').mockResolvedValue(mockedMovie1)
      const res = await service.findOne(mockedMovie1.id)
      expect(movieRepositorySpy).toHaveBeenCalled()
      expect(res).toEqual(mockedMovie1)
    })
    it('should throw not found for non existent movie', async ()=>{
      const movieRepositorySpy = jest.spyOn(movieRepository, 'findOne').mockResolvedValue(null)
      const res = service.findOne(mockedMovie1.id)
      expect(movieRepositorySpy).toHaveBeenCalled()
      expect(res).rejects.toThrow(NotFoundException)
    })
  })

  describe('findAll', ()=>{
    it('should return movies list', async ()=>{
      const movieRepositorySpy = jest.spyOn(movieRepository, 'find').mockResolvedValue(mockedMovies)
      const res = await service.findAll({limit: 1000, offset: 0})
      expect(movieRepositorySpy).toHaveBeenCalledWith({take: 1000, skip: 0})
      expect(res).toEqual(mockedMovies)
    })
  })

  describe('update', ()=>{
    it('should update movie and return it', async ()=>{
      const movieRepositorySpyCount = jest.spyOn(movieRepository, 'count').mockResolvedValue(1)
      const movieRepositorySpyUpdate = jest.spyOn(movieRepository, 'update').mockResolvedValue({
        raw: '',
        affected: 1,
        generatedMaps: []
      })
      const movieRepositorySpyFindOne = jest.spyOn(movieRepository, 'findOne').mockResolvedValue({...mockedMovie1, description: 'updated description'})
      const {id, ...data} = mockedMovie1;
      const updateData = {...data, description: 'updated description'}
      const res = await service.update(id, updateData)
      expect(movieRepositorySpyCount).toHaveBeenCalled()
      expect(movieRepositorySpyFindOne).toHaveBeenCalled()
      expect(movieRepositorySpyUpdate).toHaveBeenCalledWith(id, updateData)
      expect(res).toEqual({...updateData, id})
    })
    it('should throw not found for existent movie', async ()=>{
      const movieRepositorySpyCount = jest.spyOn(movieRepository, 'count').mockResolvedValue(0)
      const {id, ...data} = mockedMovie1;
      const updateData = {...data, description: 'updated description'}
      const res = service.update(id, updateData)
      expect(movieRepositorySpyCount).toHaveBeenCalled()
      expect(res).rejects.toThrow(NotFoundException)
    })
  })

  describe('delete', ()=>{
    it('should delete movie and return it', async ()=>{
      const serviceSpyFindOne = jest.spyOn(service, 'findOne').mockResolvedValue(mockedMovie1)
      const movieRepositorySpy = jest.spyOn(movieRepository, 'remove').mockResolvedValue(mockedMovie1)    
      const {id, ...data} = mockedMovie1;
      const res = await service.delete(id)
      expect(serviceSpyFindOne).toHaveBeenCalled()
      expect(movieRepositorySpy).toHaveBeenCalled()
      expect(res).toEqual(mockedMovie1)
    })

    it('should throw not found for non existent movie', async ()=>{
      const movieRepositorySpy = jest.spyOn(movieRepository, 'findOne').mockResolvedValue(null)
      const {id, ...data} = mockedMovie1;
      const res = service.delete(id)
      expect(movieRepositorySpy).toHaveBeenCalled()
      expect(res).rejects.toThrow(NotFoundException)
    })
  })
});
