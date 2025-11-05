import { Test, TestingModule } from '@nestjs/testing';
import { ClimatesController } from './climates.controller';
import { ClimatesService } from './climates.service';

describe('ClimatesController', () => {
  let controller: ClimatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClimatesController],
      providers: [ClimatesService],
    }).compile();

    controller = module.get<ClimatesController>(ClimatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
