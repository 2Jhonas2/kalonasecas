import { PrismaService } from "../prisma/prisma.service";
export declare class CatalogController {
    private prisma;
    constructor(prisma: PrismaService);
    deps(): Promise<{
        code: string | null;
        name: string;
        id_department: number;
    }[]>;
    cities(departmentId?: string): Promise<{
        name: string;
        id_department: number;
        id_city: number;
    }[]>;
    climates(): Promise<{
        id_climate: number;
        code: string;
        name: string;
        description: string | null;
        is_active: boolean;
    }[]>;
    categories(): Promise<{
        code: string;
        name: string;
        id_category: number;
    }[]>;
}
