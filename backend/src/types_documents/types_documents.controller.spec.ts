import { Test, TestingModule } from '@nestjs/testing';
import { TypesDocumentsController } from './types_documents.controller';
import { TypesDocumentsService } from './types_documents.service';

describe('TypesDocumentsController', () => {
  let controller: TypesDocumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypesDocumentsController],
      providers: [TypesDocumentsService],
    }).compile();

    controller = module.get<TypesDocumentsController>(TypesDocumentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
