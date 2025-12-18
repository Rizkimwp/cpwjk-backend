import { Module } from '@nestjs/common';
import { ProductIngredientService } from './product_ingredient.service';
import { ProductIngredientController } from './product_ingredient.controller';

@Module({
  controllers: [ProductIngredientController],
  providers: [ProductIngredientService],
})
export class ProductIngredientModule {}
