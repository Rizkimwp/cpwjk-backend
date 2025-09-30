import { Module } from '@nestjs/common';
import { CarierService } from './carier.service';
import { CarierController } from './carier.controller';
import { Carier } from './entities/carier.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carier, User])],
  controllers: [CarierController],
  providers: [CarierService],
})
export class CarierModule {}
