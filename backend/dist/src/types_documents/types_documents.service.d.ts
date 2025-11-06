import { PrismaService } from 'src/prisma/prisma.service';
export declare class TypesDocumentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id_type_document: number;
        document_name: string;
    }[]>;
}
