import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/core/auth/jwt.guard';
import { RolesGuard } from 'src/core/auth/roles.guard';
import { Roles } from 'src/core/auth/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/product',
        filename: (req, file, cb) => {
          const ext = file.originalname.split('.').pop();
          cb(null, `product-${Date.now()}.${ext}`);
        },
      }),
    }),
  )
  create(@UploadedFile() image: Express.Multer.File, @Body() body: any) {
    const dto: CreateProductDto = {
      ...body,
      nutrients: body.nutrients ? JSON.parse(body.nutrients) : [],
      ingredients: body.ingredients ? JSON.parse(body.ingredients) : [],
    };

    return this.productService.create(dto, image);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/product',
        filename: (req, file, cb) => {
          const ext = file.originalname.split('.').pop();
          cb(null, `product-${Date.now()}.${ext}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() body: any,
  ) {
    // 🔹 PARSE ARRAY JSON
    let nutrients = [];
    let ingredients = [];

    try {
      if (body.nutrients) {
        nutrients = JSON.parse(body.nutrients);
      }

      if (body.ingredients) {
        ingredients = JSON.parse(body.ingredients);
      }
    } catch (err) {
      throw new BadRequestException(
        'Format nutrients / ingredients harus JSON string',
      );
    }

    const dto: UpdateProductDto = {
      name: body.name,
      kategori: body.kategori,
      productionCode: body.productionCode,
      npp: body.npp,
      netWeightKg: body.netWeightKg ? Number(body.netWeightKg) : undefined,
      usage: body.usage,
      storage: body.storage,
      nutrients,
      ingredients,
    };

    return this.productService.update(id, dto, image);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
