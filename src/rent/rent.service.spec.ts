import { Test, TestingModule } from '@nestjs/testing';
import { RentService } from './rent.service';

describe('RentService', () => {
  let service: RentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentService],
    }).compile();

    service = module.get<RentService>(RentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
