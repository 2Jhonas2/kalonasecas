import { Test, TestingModule } from '@nestjs/testing';
import { AdminsPlacesService } from './admins_places.service';

describe('AdminsPlacesService', () => {
  let service: AdminsPlacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminsPlacesService],
    }).compile();

    service = module.get<AdminsPlacesService>(AdminsPlacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
