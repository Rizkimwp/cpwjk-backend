import { Injectable } from '@nestjs/common';
import { CreateCarierDto } from './dto/create-carier.dto';
import { UpdateCarierDto } from './dto/update-carier.dto';

@Injectable()
export class CarierService {
  create(createCarierDto: CreateCarierDto) {
    return 'This action adds a new carier';
  }

  findAll() {
    return `This action returns all carier`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carier`;
  }

  update(id: number, updateCarierDto: UpdateCarierDto) {
    return `This action updates a #${id} carier`;
  }

  remove(id: number) {
    return `This action removes a #${id} carier`;
  }
}
