import { Test, TestingModule } from '@nestjs/testing';
import { ProductNutrientsService } from './product_nutrients.service';

describe('ProductNutrientsService', () => {
  let service: ProductNutrientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductNutrientsService],
    }).compile();

    service = module.get<ProductNutrientsService>(ProductNutrientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
