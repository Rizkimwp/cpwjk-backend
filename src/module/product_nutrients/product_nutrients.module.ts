import { Module } from '@nestjs/common';
import { ProductNutrientsService } from './product_nutrients.service';
import { ProductNutrientsController } from './product_nutrients.controller';

@Module({
  controllers: [ProductNutrientsController],
  providers: [ProductNutrientsService],
})
export class ProductNutrientsModule {}
