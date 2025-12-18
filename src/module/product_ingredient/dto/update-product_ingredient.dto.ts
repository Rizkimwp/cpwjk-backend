import { PartialType } from '@nestjs/swagger';
import { CreateProductIngredientDto } from './create-product_ingredient.dto';

export class UpdateProductIngredientDto extends PartialType(CreateProductIngredientDto) {}
