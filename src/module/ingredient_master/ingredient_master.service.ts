import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIngredientMasterDto } from './dto/create-ingredient_master.dto';
import { UpdateIngredientMasterDto } from './dto/update-ingredient_master.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientMaster } from './entities/ingredient_master.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientMasterService {
  constructor(
    @InjectRepository(IngredientMaster)
    private readonly repo: Repository<IngredientMaster>,
  ) {}

  create(dto: CreateIngredientMasterDto) {
    const data = this.repo.create(dto);
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const data = await this.repo.findOne({ where: { id } });
    if (!data) throw new NotFoundException('Ingredient not found');
    return data;
  }

  async update(id: string, dto: UpdateIngredientMasterDto) {
    const data = await this.findOne(id);
    Object.assign(data, dto);
    return this.repo.save(data);
  }

  async remove(id: string) {
    const data = await this.findOne(id);
    return this.repo.remove(data);
  }
}
