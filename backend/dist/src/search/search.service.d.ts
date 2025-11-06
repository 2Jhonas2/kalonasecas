import { PrismaService } from "../prisma/prisma.service";
type SearchParams = {
    query?: string;
    departmentId?: number;
    cityId?: number;
    categoryId?: number;
    climateId?: number;
    minPrice?: number;
    maxPrice?: number;
    take?: number;
    skip?: number;
};
export declare class SearchService {
    private prisma;
    constructor(prisma: PrismaService);
    search(params: SearchParams): Promise<{
        items: ({
            department: {
                code: string | null;
                name: string;
                id_department: number;
            };
            city: {
                name: string;
                id_department: number;
                id_city: number;
            };
            categories: ({
                category: {
                    code: string;
                    name: string;
                    id_category: number;
                };
            } & {
                id_place_recreational: number;
                id_place_category: number;
                id_category: number;
            })[];
            climate: {
                id_climate: number;
                code: string;
                name: string;
                description: string | null;
                is_active: boolean;
            } | null;
        } & {
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
        })[];
        total: number;
        take: number;
        skip: number;
    }>;
}
export {};
