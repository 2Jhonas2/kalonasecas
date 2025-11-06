import { PrismaService } from '../prisma/prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';
export declare class NewsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateNewsDto): Promise<{
        description: string;
        id: number;
        title: string;
        type: string;
        entityId: string | null;
        imageUrl: string | null;
        createdAt: Date;
        expiresAt: Date;
    }>;
    findLatest(limit?: number): Promise<{
        description: string;
        id: number;
        title: string;
        type: string;
        entityId: string | null;
        imageUrl: string | null;
        createdAt: Date;
        expiresAt: Date;
    }[]>;
    purgeExpired(): Promise<{
        purged: number;
    }>;
}
