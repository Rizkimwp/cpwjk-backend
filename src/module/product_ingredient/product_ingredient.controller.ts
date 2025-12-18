import { Controller } from '@nestjs/common';
import { ProductIngredientService } from './product_ingredient.service';

@Controller('product-ingredient')
export class ProductIngredientController {
  constructor(
    private readonly productIngredientService: ProductIngredientService,
  ) {}
}
