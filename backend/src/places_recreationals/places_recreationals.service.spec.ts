import { Test, TestingModule } from '@nestjs/testing';
import { PlacesRecreationalsService } from './places_recreationals.service';

describe('PlacesRecreationalsService', () => {
  let service: PlacesRecreationalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlacesRecreationalsService],
    }).compile();

    service = module.get<PlacesRecreationalsService>(PlacesRecreationalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
