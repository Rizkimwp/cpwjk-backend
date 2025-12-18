import { Module } from '@nestjs/common';
import { IngredientMasterService } from './ingredient_master.service';
import { IngredientMasterController } from './ingredient_master.controller';
import { IngredientMaster } from './entities/ingredient_master.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientMaster])],
  controllers: [IngredientMasterController],
  providers: [IngredientMasterService],
})
export class IngredientMasterModule {}
