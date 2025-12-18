import { Test, TestingModule } from '@nestjs/testing';
import { ProductNutrientsController } from './product_nutrients.controller';
import { ProductNutrientsService } from './product_nutrients.service';

describe('ProductNutrientsController', () => {
  let controller: ProductNutrientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductNutrientsController],
      providers: [ProductNutrientsService],
    }).compile();

    controller = module.get<ProductNutrientsController>(ProductNutrientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
