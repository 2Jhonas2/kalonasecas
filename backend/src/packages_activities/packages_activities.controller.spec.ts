import { Test, TestingModule } from '@nestjs/testing';
import { PackagesActivitiesController } from './packages_activities.controller';
import { PackagesActivitiesService } from './packages_activities.service';

describe('PackagesActivitiesController', () => {
  let controller: PackagesActivitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackagesActivitiesController],
      providers: [PackagesActivitiesService],
    }).compile();

    controller = module.get<PackagesActivitiesController>(PackagesActivitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
