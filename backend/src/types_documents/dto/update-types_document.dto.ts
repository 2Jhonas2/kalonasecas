import { PartialType } from '@nestjs/mapped-types';
import { CreateTypesDocumentDto } from './create-types_document.dto';

export class UpdateTypesDocumentDto extends PartialType(CreateTypesDocumentDto) {}
