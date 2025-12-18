import { Controller } from '@nestjs/common';
import { ProductNutrientsService } from './product_nutrients.service';

@Controller('product-nutrients')
export class ProductNutrientsController {
  constructor(
    private readonly productNutrientsService: ProductNutrientsService,
  ) {}
}
