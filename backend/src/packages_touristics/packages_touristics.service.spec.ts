import { Test, TestingModule } from '@nestjs/testing';
import { PackagesTouristicsService } from './packages_touristics.service';

describe('PackagesTouristicsService', () => {
  let service: PackagesTouristicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackagesTouristicsService],
    }).compile();

    service = module.get<PackagesTouristicsService>(PackagesTouristicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
