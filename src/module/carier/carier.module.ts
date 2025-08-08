import { Module } from '@nestjs/common';
import { CarierService } from './carier.service';
import { CarierController } from './carier.controller';

@Module({
  controllers: [CarierController],
  providers: [CarierService],
})
export class CarierModule {}
