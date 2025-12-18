import { PartialType } from '@nestjs/swagger';
import { CreateNutrientMasterDto } from './create-nutrient_master.dto';

export class UpdateNutrientMasterDto extends PartialType(CreateNutrientMasterDto) {}
