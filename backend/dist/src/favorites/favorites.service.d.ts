import { PrismaService } from '../prisma/prisma.service';
export declare class FavoritesService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserFavoriteIds(userId: number): Promise<number[]>;
    addFavorite(userId: number, placeId: number): Promise<{
        id_user: number;
        id_place_recreational: number;
        id_favorite: number;
    }>;
    removeFavorite(userId: number, placeId: number): Promise<{
        id_user: number;
        id_place_recreational: number;
        id_favorite: number;
    }>;
}
