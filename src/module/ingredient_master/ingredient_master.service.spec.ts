import { Test, TestingModule } from '@nestjs/testing';
import { IngredientMasterService } from './ingredient_master.service';

describe('IngredientMasterService', () => {
  let service: IngredientMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngredientMasterService],
    }).compile();

    service = module.get<IngredientMasterService>(IngredientMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
