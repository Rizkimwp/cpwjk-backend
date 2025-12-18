import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductNutrient } from '../product_nutrients/entities/product_nutrient.entity';
import { ProductIngredient } from '../product_ingredient/entities/product_ingredient.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { NutrientMaster } from '../nutrient_master/entities/nutrient_master.entity';
import { IngredientMaster } from '../ingredient_master/entities/ingredient_master.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(ProductNutrient)
    private nutrientRepo: Repository<ProductNutrient>,

    @InjectRepository(ProductIngredient)
    private ingredientRepo: Repository<ProductIngredient>,

    @InjectRepository(NutrientMaster)
    private nutrientMasterRepo: Repository<NutrientMaster>,

    @InjectRepository(IngredientMaster)
    private ingredientMasterRepo: Repository<IngredientMaster>,
  ) {}
  async create(dto: CreateProductDto, image?: Express.Multer.File) {
    return this.dataSource.transaction(async (manager) => {
      const nutrients = dto.nutrients ?? [];
      const ingredients = dto.ingredients ?? [];

      if (!Array.isArray(nutrients)) {
        throw new BadRequestException('Format nutrients tidak valid');
      }

      if (!Array.isArray(ingredients)) {
        throw new BadRequestException('Format ingredients tidak valid');
      }

      // 1️⃣ Simpan Product
      const product = manager.create(Product, {
        name: dto.name,
        productionCode: dto.productionCode,
        npp: dto.npp,
        kategori: dto.kategori,
        netWeightKg: dto.netWeightKg,
        usage: dto.usage,
        storage: dto.storage,
        image: image ? `/uploads/product/${image.filename}` : undefined,
      });

      const savedProduct = await manager.save(product);

      // 2️⃣ Simpan Nutrients
      for (const item of nutrients) {
        if (item.minValue === undefined || item.maxValue === undefined) {
          throw new BadRequestException('minValue dan maxValue wajib diisi');
        }

        const nutrientMaster = await manager.findOne(NutrientMaster, {
          where: { id: item.nutrientId },
        });

        if (!nutrientMaster) {
          throw new NotFoundException(
            `NutrientMaster ${item.nutrientId} tidak ditemukan`,
          );
        }

        await manager.save(
          manager.create(ProductNutrient, {
            product: savedProduct,
            nutrient: nutrientMaster,
            minValue: Number(item.minValue),
            maxValue: Number(item.maxValue),
          }),
        );
      }

      // 3️⃣ Simpan Ingredients
      for (const item of ingredients) {
        const ingredientMaster = await manager.findOne(IngredientMaster, {
          where: { id: item.ingredientId },
        });

        if (!ingredientMaster) {
          throw new NotFoundException(
            `IngredientMaster ${item.ingredientId} tidak ditemukan`,
          );
        }

        await manager.save(
          manager.create(ProductIngredient, {
            product: savedProduct,
            ingredient: ingredientMaster,
          }),
        );
      }

      return manager.findOne(Product, {
        where: { id: savedProduct.id },
        relations: [
          'productNutrients',
          'productNutrients.nutrient',
          'productIngredients',
          'productIngredients.ingredient',
        ],
      });
    });
  }

  async update(id: string, dto: UpdateProductDto, image?: Express.Multer.File) {
    return this.dataSource.transaction(async (manager) => {
      const nutrients = dto.nutrients ?? [];
      const ingredients = dto.ingredients ?? [];

      if (!Array.isArray(nutrients)) {
        throw new BadRequestException('Format nutrients tidak valid');
      }

      if (!Array.isArray(ingredients)) {
        throw new BadRequestException('Format ingredients tidak valid');
      }

      // 1️⃣ Ambil product lama
      const product = await manager.findOne(Product, {
        where: { id },
        relations: ['productNutrients', 'productIngredients'],
      });

      if (!product) {
        throw new NotFoundException('Product tidak ditemukan');
      }

      // 2️⃣ Update basic field
      product.name = dto.name ?? '';
      product.productionCode = dto.productionCode ?? '';
      product.npp = dto.npp ?? '';
      product.kategori = dto.kategori ?? '';
      product.netWeightKg = dto.netWeightKg ?? 0;
      product.usage = dto.usage ?? '';
      product.storage = dto.storage ?? '';

      // 3️⃣ Update image (jika ada file baru)
      if (image) {
        product.image = `/uploads/product/${image.filename}`;
      }

      const updatedProduct = await manager.save(product);

      // 4️⃣ HAPUS relasi lama
      await manager.delete(ProductNutrient, {
        product: { id: updatedProduct.id },
      });

      await manager.delete(ProductIngredient, {
        product: { id: updatedProduct.id },
      });

      // 5️⃣ INSERT Nutrients baru
      for (const item of nutrients) {
        if (item.minValue === undefined || item.maxValue === undefined) {
          throw new BadRequestException('minValue dan maxValue wajib diisi');
        }

        const nutrientMaster = await manager.findOne(NutrientMaster, {
          where: { id: item.nutrientId },
        });

        if (!nutrientMaster) {
          throw new NotFoundException(
            `NutrientMaster ${item.nutrientId} tidak ditemukan`,
          );
        }

        await manager.save(
          manager.create(ProductNutrient, {
            product: updatedProduct,
            nutrient: nutrientMaster,
            minValue: Number(item.minValue),
            maxValue: Number(item.maxValue),
          }),
        );
      }

      // 6️⃣ INSERT Ingredients baru
      for (const item of ingredients) {
        const ingredientMaster = await manager.findOne(IngredientMaster, {
          where: { id: item.ingredientId },
        });

        if (!ingredientMaster) {
          throw new NotFoundException(
            `IngredientMaster ${item.ingredientId} tidak ditemukan`,
          );
        }

        await manager.save(
          manager.create(ProductIngredient, {
            product: updatedProduct,
            ingredient: ingredientMaster,
          }),
        );
      }

      // 7️⃣ Return product lengkap
      return manager.findOne(Product, {
        where: { id: updatedProduct.id },
        relations: [
          'productNutrients',
          'productNutrients.nutrient',
          'productIngredients',
          'productIngredients.ingredient',
        ],
      });
    });
  }

  findAll() {
    return this.productRepo.find({
      relations: ['productNutrients', 'productIngredients'],
    });
  }

  findOne(id: string) {
    return this.productRepo.findOne({
      where: { id },
      relations: ['productNutrients.nutrient', 'productIngredients.ingredient'],
    });
  }

  async remove(productId: string) {
    return this.dataSource.transaction(async (manager) => {
      // 1️⃣ Cek product
      const product = await manager.findOne(Product, {
        where: { id: productId },
      });

      if (!product) {
        throw new NotFoundException('Product tidak ditemukan');
      }

      // 2️⃣ Hapus relasi nutrients
      await manager.delete(ProductNutrient, {
        product: { id: productId },
      });

      // 3️⃣ Hapus relasi ingredients
      await manager.delete(ProductIngredient, {
        product: { id: productId },
      });

      // 4️⃣ Hapus product
      await manager.delete(Product, { id: productId });

      return {
        message: 'Product berhasil dihapus',
        productId,
      };
    });
  }
}
