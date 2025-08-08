import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarierService } from './carier.service';
import { CreateCarierDto } from './dto/create-carier.dto';
import { UpdateCarierDto } from './dto/update-carier.dto';

@Controller('carier')
export class CarierController {
  constructor(private readonly carierService: CarierService) {}

  @Post()
  create(@Body() createCarierDto: CreateCarierDto) {
    return this.carierService.create(createCarierDto);
  }

  @Get()
  findAll() {
    return this.carierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carierService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarierDto: UpdateCarierDto) {
    return this.carierService.update(+id, updateCarierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carierService.remove(+id);
  }
}
