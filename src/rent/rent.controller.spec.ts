import { Test, TestingModule } from '@nestjs/testing';
import { RentController } from './rent.controller';

describe('RentController', () => {
  let controller: RentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentController],
    }).compile();

    controller = module.get<RentController>(RentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
