import { PartialType } from '@nestjs/swagger';
import { CreateProductNutrientDto } from './create-product_nutrient.dto';

export class UpdateProductNutrientDto extends PartialType(CreateProductNutrientDto) {}
