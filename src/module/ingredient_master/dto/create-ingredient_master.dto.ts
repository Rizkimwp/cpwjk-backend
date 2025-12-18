import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateIngredientMasterDto {
  @ApiProperty()
  @IsString()
  name: string;
}
