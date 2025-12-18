import { Test, TestingModule } from '@nestjs/testing';
import { IngredientMasterController } from './ingredient_master.controller';
import { IngredientMasterService } from './ingredient_master.service';

describe('IngredientMasterController', () => {
  let controller: IngredientMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientMasterController],
      providers: [IngredientMasterService],
    }).compile();

    controller = module.get<IngredientMasterController>(IngredientMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
