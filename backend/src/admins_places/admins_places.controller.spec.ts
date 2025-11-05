import { Test, TestingModule } from '@nestjs/testing';
import { AdminsPlacesController } from './admins_places.controller';
import { AdminsPlacesService } from './admins_places.service';

describe('AdminsPlacesController', () => {
  let controller: AdminsPlacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminsPlacesController],
      providers: [AdminsPlacesService],
    }).compile();

    controller = module.get<AdminsPlacesController>(AdminsPlacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
