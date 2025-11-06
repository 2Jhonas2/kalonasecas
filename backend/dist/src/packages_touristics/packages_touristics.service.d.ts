import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { NewsService } from '../news/news.service';
export declare class PackagesTouristicsService {
    private prisma;
    private newsService;
    constructor(prisma: PrismaService, newsService: NewsService);
    create(data: Prisma.packages_touristicsUncheckedCreateInput): Promise<{
        place_recreational: {
            id_climate: number | null;
            is_active: boolean;
            id_department: number;
            id_user: number | null;
            place_name: string;
            direction: string | null;
            email_place_recreational: string | null;
            id_city: number;
            image_url: string | null;
            short_description: string | null;
            keywords: string | null;
            search_name: string | null;
            price_from: number | null;
            latitude: number | null;
            longitude: number | null;
            id_place_recreational: number;
            rating_avg: number | null;
            review_count: number | null;
        };
    } & {
        id_climate: number;
        id_package_touristic: number;
        id_place_recreational: number;
        name_package_touristic: string;
        description_package_touristic: string;
        days_durations: Date;
        price_package_touristic: number;
    }>;
    findAll(): Promise<{
        id_climate: number;
        id_package_touristic: number;
        id_place_recreational: number;
        name_package_touristic: string;
        description_package_touristic: string;
        days_durations: Date;
        price_package_touristic: number;
    }[]>;
    findOne(id: number): Promise<{
        place_recreational: {
            id_climate: number | null;
            is_active: boolean;
            id_department: number;
            id_user: number | null;
            place_name: string;
            direction: string | null;
            email_place_recreational: string | null;
            id_city: number;
            image_url: string | null;
            short_description: string | null;
            keywords: string | null;
            search_name: string | null;
            price_from: number | null;
            latitude: number | null;
            longitude: number | null;
            id_place_recreational: number;
            rating_avg: number | null;
            review_count: number | null;
        };
    } & {
        id_climate: number;
        id_package_touristic: number;
        id_place_recreational: number;
        name_package_touristic: string;
        description_package_touristic: string;
        days_durations: Date;
        price_package_touristic: number;
    }>;
    update(id: number, dto: Partial<Prisma.packages_touristicsUncheckedUpdateInput>): Promise<{
        id_climate: number;
        id_package_touristic: number;
        id_place_recreational: number;
        name_package_touristic: string;
        description_package_touristic: string;
        days_durations: Date;
        price_package_touristic: number;
    }>;
    remove(id: number): Promise<{
        ok: boolean;
        id: number;
    }>;
}
