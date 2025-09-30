import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CarierService } from './carier.service';
import { CarierFilterDto, CreateCarierDto } from './dto/create-carier.dto';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { Carier } from './entities/carier.entity';
import { JwtAuthGuard } from 'src/core/auth/jwt.guard';
import { RolesGuard } from 'src/core/auth/roles.guard';
import { Roles } from 'src/core/auth/roles.decorator';

@Controller('carier')
export class CarierController {
  constructor(private readonly carierService: CarierService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Post()
  @ApiResponse({ status: 201, description: 'Create new carier', type: Carier })
  create(@Body() dto: CreateCarierDto) {
    return this.carierService.createOrUpdate(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List User' })
  async findAll(@Query() query: CarierFilterDto) {
    const { data, total } = await this.carierService.findAll(query);
    return {
      success: true,
      message: 'Request berhasil',
      data: {
        data,
        total: total,
      },
    };
  }

  @Get('published')
  @ApiResponse({ status: 200, description: 'List User' })
  async findAllPublished(@Query() query: CarierFilterDto) {
    const { data, total } = await this.carierService.findAllPublished(query);
    return {
      success: true,
      message: 'Request berhasil',
      data: {
        data,
        total: total,
      },
    };
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Get one carier', type: Carier })
  findOne(@Param('id') id: string) {
    return this.carierService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update carier', type: Carier })
  update(@Param('id') id: string, @Body() dto: { isPublished: boolean }) {
    return this.carierService.updatePublish(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete carier' })
  remove(@Param('id') id: string) {
    return this.carierService.remove(id);
  }
}
