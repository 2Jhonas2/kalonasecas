import { TypesDocumentsService } from './types_documents.service';
export declare class TypesDocumentsController {
    private readonly typesDocumentsService;
    constructor(typesDocumentsService: TypesDocumentsService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id_type_document: number;
        document_name: string;
    }[]>;
}
