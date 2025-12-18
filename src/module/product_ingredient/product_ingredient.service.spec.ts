import { Test, TestingModule } from '@nestjs/testing';
import { ProductIngredientService } from './product_ingredient.service';

describe('ProductIngredientService', () => {
  let service: ProductIngredientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductIngredientService],
    }).compile();

    service = module.get<ProductIngredientService>(ProductIngredientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
