import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NutrientMasterService } from './nutrient_master.service';
import { CreateNutrientMasterDto } from './dto/create-nutrient_master.dto';
import { UpdateNutrientMasterDto } from './dto/update-nutrient_master.dto';
import { JwtAuthGuard } from 'src/core/auth/jwt.guard';
import { Roles } from 'src/core/auth/roles.decorator';
import { RolesGuard } from 'src/core/auth/roles.guard';

@Controller('nutrient-master')
export class NutrientMasterController {
  constructor(private readonly service: NutrientMasterService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Post()
  create(@Body() dto: CreateNutrientMasterDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNutrientMasterDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
