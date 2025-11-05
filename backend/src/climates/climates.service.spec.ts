import { Test, TestingModule } from '@nestjs/testing';
import { ClimatesService } from './climates.service';

describe('ClimatesService', () => {
  let service: ClimatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClimatesService],
    }).compile();

    service = module.get<ClimatesService>(ClimatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
