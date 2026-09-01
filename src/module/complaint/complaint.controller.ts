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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { ApiParam, ApiResponse } from '@nestjs/swagger';

import { ComplaintService } from './complaint.service';

import { Complaint } from './entities/complaint.entity';

import { JwtAuthGuard } from 'src/core/auth/jwt.guard';
import { RolesGuard } from 'src/core/auth/roles.guard';
import { Roles } from 'src/core/auth/roles.decorator';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { ComplaintFilterDto } from './dto/filter-complaint.dto';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('complaint')
export class ComplaintController {
  constructor(private readonly complaintService: ComplaintService) {}

  // =========================================================
  // CREATE / UPDATE
  // =========================================================

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'foto_video',
          maxCount: 10,
        },
        {
          name: 'dokumen',
          maxCount: 10,
        },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            if (file.fieldname === 'foto_video') {
              cb(null, './uploads/complaints/foto-video');
            } else if (file.fieldname === 'dokumen') {
              cb(null, './uploads/complaints/dokumen');
            } else {
              cb(null, './uploads/complaints');
            }
          },

          filename: (req, file, cb) => {
            const ext = extname(file.originalname);

            const filename = `${Date.now()}-${Math.round(
              Math.random() * 1e9,
            )}${ext}`;

            cb(null, filename);
          },
        }),
      },
    ),
  )
  @ApiResponse({
    status: 201,
    description: 'Create new complaint',
    type: Complaint,
  })
  create(
    @UploadedFiles()
    files: {
      foto_video?: Express.Multer.File[];
      dokumen?: Express.Multer.File[];
    },

    @Body() body: CreateComplaintDto,
  ) {
    console.log('BODY:', body);
    console.log('FILES:', files);

    return this.complaintService.createOrUpdate({
      ...body,

      foto_video: files?.foto_video?.map((file) => file.filename) ?? [],

      dokumen: files?.dokumen?.map((file) => file.filename) ?? [],
    });
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
  // UPDATE STATUS
  // =========================================================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Put(':id/status')
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Update complaint status',
    type: Complaint,
  })
  updateStatus(@Param('id') id: string, @Body() dto: { status: string }) {
    return this.complaintService.updateStatus(id, dto);
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
  })
  @ApiResponse({
    status: 200,
    description: 'Delete complaint',
  })
  remove(@Param('id') id: string) {
    return this.complaintService.remove(id);
  }
}
