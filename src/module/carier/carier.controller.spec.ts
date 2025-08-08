import { Test, TestingModule } from '@nestjs/testing';
import { CarierController } from './carier.controller';
import { CarierService } from './carier.service';

describe('CarierController', () => {
  let controller: CarierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarierController],
      providers: [CarierService],
    }).compile();

    controller = module.get<CarierController>(CarierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
