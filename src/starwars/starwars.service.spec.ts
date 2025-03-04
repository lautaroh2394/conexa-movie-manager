import { Test, TestingModule } from '@nestjs/testing';
import { StarWarsService } from './starwars.service';
import { expectedGetMovies, sw1, sw2 } from './test-constants';

describe('StarwarsService', () => {
  let service: StarWarsService;
  const mockedApiResponse = {
    results: [
      sw1,
      sw2,
    ]
  }

  beforeEach(async () => {
    service = new StarWarsService()
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMovies', () => {
    it('should return movies from api', async ()=>{
      jest.spyOn(global, 'fetch').mockResolvedValue({
          json: () => Promise.resolve(mockedApiResponse)
        } as Response
      )
  
      const res = await service.getMovies()
      expect(res).toEqual(expectedGetMovies)
    })

    it('should return empty list in case of any error', async ()=>{
      jest.spyOn(global, 'fetch').mockResolvedValue({
          json: () => Promise.reject(new Error())
        } as Response
      )

      const res = await service.getMovies()
      expect(res).toEqual([])
    })
  })
});
