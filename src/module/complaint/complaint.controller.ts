import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ApiParam, ApiResponse } from '@nestjs/swagger';

import { ComplaintService } from './complaint.service';
import { Complaint } from './entities/complaint.entity';

import { JwtAuthGuard } from 'src/core/auth/jwt.guard';
import { RolesGuard } from 'src/core/auth/roles.guard';
import { Roles } from 'src/core/auth/roles.decorator';

import { CreateComplaintDto } from './dto/create-complaint.dto';
import { ComplaintFilterDto } from './dto/filter-complaint.dto';

@Controller('complaint')
export class ComplaintController {
  constructor(private readonly complaintService: ComplaintService) {}

  // =========================================================
  // CREATE
  // =========================================================

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create new complaint',
    type: Complaint,
  })
  create(@Body() dto: CreateComplaintDto) {
    return this.complaintService.create(dto);
  }

  // =========================================================
  // FIND ALL
  // =========================================================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Get()
  @ApiResponse({
    status: 200,
    description: 'List complaint',
  })
  async findAll(@Query() query: ComplaintFilterDto) {
    const { data, total } = await this.complaintService.findAll(query);

    return {
      success: true,
      message: 'Request berhasil',
      data: {
        data,
        total,
      },
    };
  }

  // =========================================================
  // FIND ONE
  // =========================================================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Get one complaint',
    type: Complaint,
  })
  findOne(@Param('id') id: string) {
    return this.complaintService.findOne(id);
  }

  // =========================================================
  // UPDATE
  // =========================================================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Put(':id')
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Update complaint',
    type: Complaint,
  })
  update(@Param('id') id: string, @Body() dto: CreateComplaintDto) {
    return this.complaintService.update(id, dto);
  }

  // =========================================================
  // DELETE
  // =========================================================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Delete complaint',
  })
  remove(@Param('id') id: string) {
    return this.complaintService.remove(id);
  }
}
