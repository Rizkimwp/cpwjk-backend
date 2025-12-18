import { PartialType } from '@nestjs/swagger';
import { CreateIngredientMasterDto } from './create-ingredient_master.dto';

export class UpdateIngredientMasterDto extends PartialType(CreateIngredientMasterDto) {}
