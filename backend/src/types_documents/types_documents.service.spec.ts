import { Test, TestingModule } from '@nestjs/testing';
import { TypesDocumentsService } from './types_documents.service';

describe('TypesDocumentsService', () => {
  let service: TypesDocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypesDocumentsService],
    }).compile();

    service = module.get<TypesDocumentsService>(TypesDocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
