import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import {
  ArtikelFilterDto,
  CreateArticleDto,
  ResponseArticleDto,
} from './dto/create-article.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/auth/jwt.guard';
import { RolesGuard } from 'src/core/auth/roles.guard';
import { Roles } from 'src/core/auth/roles.decorator';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/articles', // simpan di folder ini
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const url = `/uploads/articles/${file.filename}`;
    return { url }; // frontend bisa pakai ini untuk disisipkan di content
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Post()
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: './uploads/articles/thumbnail', // folder penyimpanan
        filename: (req, file, cb) => {
          // ambil ekstensi file asli
          const ext = extname(file.originalname);
          // bikin nama custom (misal pakai timestamp)
          const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  create(
    @UploadedFile() thumbnail: Express.Multer.File,
    @Body() body: CreateArticleDto,
  ) {
    return this.articleService.create({
      ...body,
      thumbnail: thumbnail?.filename,
    });
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List Atikel' })
  async findAll(@Query() query: ArtikelFilterDto) {
    const { data, total } = await this.articleService.findAll(query);
    return {
      success: true,
      message: 'Request berhasil',
      data: {
        data,
        total: total,
      },
    };
  }

  @Get('popular')
  async getPopularArticles(): Promise<ResponseArticleDto[]> {
    return this.articleService.findPopular();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.articleService.findOne(slug);
  }
}
