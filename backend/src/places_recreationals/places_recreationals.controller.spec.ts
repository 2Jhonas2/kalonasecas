import { Test, TestingModule } from '@nestjs/testing';
import { PlacesRecreationalsController } from './places_recreationals.controller';
import { PlacesRecreationalsService } from './places_recreationals.service';

describe('PlacesRecreationalsController', () => {
  let controller: PlacesRecreationalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacesRecreationalsController],
      providers: [PlacesRecreationalsService],
    }).compile();

    controller = module.get<PlacesRecreationalsController>(PlacesRecreationalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
