import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
export declare class FavoritesController {
    private readonly service;
    constructor(service: FavoritesService);
    getIds(userId: number): Promise<number[]>;
    add(dto: CreateFavoriteDto): Promise<{
        id_user: number;
        id_place_recreational: number;
        id_favorite: number;
    }>;
    remove(placeId: number, userId: number): Promise<{
        id_user: number;
        id_place_recreational: number;
        id_favorite: number;
    }>;
}
