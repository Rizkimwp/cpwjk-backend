import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductNutrient } from '../product_nutrients/entities/product_nutrient.entity';
import { ProductIngredient } from '../product_ingredient/entities/product_ingredient.entity';
import { NutrientMaster } from '../nutrient_master/entities/nutrient_master.entity';
import { IngredientMaster } from '../ingredient_master/entities/ingredient_master.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductNutrient,
      ProductIngredient,
      NutrientMaster,
      IngredientMaster,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
