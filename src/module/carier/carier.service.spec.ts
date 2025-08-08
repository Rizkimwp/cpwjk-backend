import { Test, TestingModule } from '@nestjs/testing';
import { CarierService } from './carier.service';

describe('CarierService', () => {
  let service: CarierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarierService],
    }).compile();

    service = module.get<CarierService>(CarierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
