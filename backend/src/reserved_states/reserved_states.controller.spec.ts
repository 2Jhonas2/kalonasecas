import { Test, TestingModule } from '@nestjs/testing';
import { ReservedStatesController } from './reserved_states.controller';
import { ReservedStatesService } from './reserved_states.service';

describe('ReservedStatesController', () => {
  let controller: ReservedStatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservedStatesController],
      providers: [ReservedStatesService],
    }).compile();

    controller = module.get<ReservedStatesController>(ReservedStatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
