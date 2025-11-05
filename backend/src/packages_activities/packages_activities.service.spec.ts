import { Test, TestingModule } from '@nestjs/testing';
import { PackagesActivitiesService } from './packages_activities.service';

describe('PackagesActivitiesService', () => {
  let service: PackagesActivitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackagesActivitiesService],
    }).compile();

    service = module.get<PackagesActivitiesService>(PackagesActivitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
