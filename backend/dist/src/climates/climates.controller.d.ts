import { PrismaService } from 'src/prisma/prisma.service';
export declare class ClimatesController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(): Promise<{
        id_climate: number;
        code: string;
        name: string;
        description: string | null;
    }[]>;
}
