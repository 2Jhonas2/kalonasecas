import { Test, TestingModule } from '@nestjs/testing';
import { PackagesTouristicsController } from './packages_touristics.controller';
import { PackagesTouristicsService } from './packages_touristics.service';

describe('PackagesTouristicsController', () => {
  let controller: PackagesTouristicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackagesTouristicsController],
      providers: [PackagesTouristicsService],
    }).compile();

    controller = module.get<PackagesTouristicsController>(PackagesTouristicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
