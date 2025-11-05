import { Module } from '@nestjs/common';
import { TypesDocumentsService } from './types_documents.service';
import { TypesDocumentsController } from './types_documents.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TypesDocumentsController],
  providers: [TypesDocumentsService],
})
export class TypesDocumentsModule {}