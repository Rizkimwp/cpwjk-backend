import { Test, TestingModule } from '@nestjs/testing';
import { ProductIngredientController } from './product_ingredient.controller';
import { ProductIngredientService } from './product_ingredient.service';

describe('ProductIngredientController', () => {
  let controller: ProductIngredientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductIngredientController],
      providers: [ProductIngredientService],
    }).compile();

    controller = module.get<ProductIngredientController>(ProductIngredientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
