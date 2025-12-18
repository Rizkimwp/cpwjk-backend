import { Test, TestingModule } from '@nestjs/testing';
import { NutrientMasterService } from './nutrient_master.service';

describe('NutrientMasterService', () => {
  let service: NutrientMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NutrientMasterService],
    }).compile();

    service = module.get<NutrientMasterService>(NutrientMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
