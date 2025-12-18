import { Test, TestingModule } from '@nestjs/testing';
import { NutrientMasterController } from './nutrient_master.controller';
import { NutrientMasterService } from './nutrient_master.service';

describe('NutrientMasterController', () => {
  let controller: NutrientMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NutrientMasterController],
      providers: [NutrientMasterService],
    }).compile();

    controller = module.get<NutrientMasterController>(NutrientMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
