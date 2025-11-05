import { Test, TestingModule } from '@nestjs/testing';
import { ReservedStatesService } from './reserved_states.service';

describe('ReservedStatesService', () => {
  let service: ReservedStatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservedStatesService],
    }).compile();

    service = module.get<ReservedStatesService>(ReservedStatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
