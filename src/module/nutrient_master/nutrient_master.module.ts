import { Module } from '@nestjs/common';
import { NutrientMasterService } from './nutrient_master.service';
import { NutrientMasterController } from './nutrient_master.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NutrientMaster } from './entities/nutrient_master.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NutrientMaster])],
  controllers: [NutrientMasterController],
  providers: [NutrientMasterService],
})
export class NutrientMasterModule {}
