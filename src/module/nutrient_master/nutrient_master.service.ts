import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNutrientMasterDto } from './dto/create-nutrient_master.dto';
import { UpdateNutrientMasterDto } from './dto/update-nutrient_master.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NutrientMaster } from './entities/nutrient_master.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NutrientMasterService {
  constructor(
    @InjectRepository(NutrientMaster)
    private readonly repo: Repository<NutrientMaster>,
  ) {}

  create(dto: CreateNutrientMasterDto) {
    const data = this.repo.create(dto);
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const data = await this.repo.findOne({ where: { id } });
    if (!data) throw new NotFoundException('Nutrient not found');
    return data;
  }

  async update(id: string, dto: UpdateNutrientMasterDto) {
    const data = await this.findOne(id);
    Object.assign(data, dto);
    return this.repo.save(data);
  }

  async remove(id: string) {
    const data = await this.findOne(id);
    return this.repo.remove(data);
  }
}
