import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNutrientMasterDto {
  @ApiProperty({ example: 'Protein', description: 'Name of the nutrient' })
  @IsString()
  name: string;
}
