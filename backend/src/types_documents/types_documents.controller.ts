import { Controller, Get } from '@nestjs/common';
import { TypesDocumentsService } from './types_documents.service';

@Controller('types-documents')
export class TypesDocumentsController {
  constructor(private readonly typesDocumentsService: TypesDocumentsService) {}

  @Get()
  findAll() {
    return this.typesDocumentsService.findAll();
  }
}