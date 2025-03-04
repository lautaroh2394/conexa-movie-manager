import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { createMock } from '@golevelup/ts-jest';
import { expectedResults as mockedResults } from './test-constants';

describe('TasksController', () => {
  let tasksService: TasksService;
  let controller: TasksController;

  beforeEach(async () => {
    tasksService = createMock<TasksService>();
    controller = new TasksController(tasksService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('starWarsUpdate', () => {
    it('should call tasks service and return task results', async () => {
      const tasksServiceSpy = jest.spyOn(tasksService,'updateMoviesFromStarWarsApi').mockResolvedValue(mockedResults)
      const res = await controller.starWarsUpdate()
      expect(tasksServiceSpy).toHaveBeenCalled()
      expect(res).toEqual(mockedResults)
    })
  })
});
