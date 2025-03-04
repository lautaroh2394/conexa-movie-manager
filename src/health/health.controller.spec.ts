import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    controller = new HealthController()
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return ok', async ()=>{
    expect(await controller.healthCheck()).toEqual("ok!")
  })
});
