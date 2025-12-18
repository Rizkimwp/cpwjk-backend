import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IngredientMasterService } from './ingredient_master.service';
import { CreateIngredientMasterDto } from './dto/create-ingredient_master.dto';
import { UpdateIngredientMasterDto } from './dto/update-ingredient_master.dto';

@Controller('ingredient-master')
export class IngredientMasterController {
  constructor(private readonly service: IngredientMasterService) {}

  @Post()
  create(@Body() dto: CreateIngredientMasterDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateIngredientMasterDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
