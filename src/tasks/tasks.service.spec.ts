import { TasksService } from './tasks.service';
import { StarWarsService } from 'src/starwars/starwars.service';
import { MoviesService } from 'src/movies/movies.service';
import { createMock } from '@golevelup/ts-jest';
import { expectedGetMovies } from './../../src/starwars/test-constants';
import { expectedResults } from './test-constants';
import { Movie } from 'src/movies/entities/movie.entity';

describe('TasksService', () => {
  let starWarsService: StarWarsService;
  let moviesService: MoviesService;
  let service: TasksService;

  beforeEach(async () => {
    starWarsService = createMock<StarWarsService>()
    moviesService = createMock<MoviesService>()
    service = new TasksService(starWarsService, moviesService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateMoviesFromStarWarsApi', () => {
    it('should create movies and return a list of results', async ()=>{
      const starWarsServiceSpy = jest.spyOn(starWarsService,'getMovies').mockResolvedValue(expectedGetMovies)
      const moviesServiceSpy = jest.spyOn(moviesService, 'create')
      moviesServiceSpy.mockImplementationOnce(()=>Promise.resolve({id: 1} as Movie))
      moviesServiceSpy.mockImplementationOnce(()=>Promise.reject(new Error("Some error")))
      const res = await service.updateMoviesFromStarWarsApi()
      expect(starWarsServiceSpy).toHaveBeenCalled()
      expect(res).toEqual(expectedResults)
    })
  })
});
