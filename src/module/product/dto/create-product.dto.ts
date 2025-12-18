import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class NutrientInputDto {
  @IsUUID()
  nutrientId: string;

  @IsNumber()
  minValue?: number;

  @IsNumber()
  maxValue?: number;
}

export class IngredientInputDto {
  @ApiProperty({ example: 'uuid-ingredient-id' })
  @IsUUID()
  ingredientId: string;
}
export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  kategori?: string;

  @IsOptional()
  @IsString()
  productionCode?: string;

  @IsOptional()
  @IsString()
  npp?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  netWeightKg?: number;

  @IsOptional()
  @IsString()
  usage?: string;

  @IsOptional()
  @IsString()
  storage?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NutrientInputDto)
  nutrients: NutrientInputDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientInputDto)
  ingredients: IngredientInputDto[];
}
