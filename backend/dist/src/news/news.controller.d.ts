import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
export declare class NewsController {
    private readonly service;
    constructor(service: NewsService);
    list(limit: number): Promise<{
        description: string;
        id: number;
        title: string;
        type: string;
        entityId: string | null;
        imageUrl: string | null;
        createdAt: Date;
        expiresAt: Date;
    }[]>;
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
}
