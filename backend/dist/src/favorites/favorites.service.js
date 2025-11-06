"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FavoritesService = class FavoritesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserFavoriteIds(userId) {
        const rows = await this.prisma.favorites.findMany({
            where: { id_user: userId },
            select: { id_place_recreational: true },
            orderBy: { id_favorite: 'desc' },
        });
        return rows.map((r) => r.id_place_recreational);
    }
    async addFavorite(userId, placeId) {
        return this.prisma.favorites.upsert({
            where: {
                id_user_id_place_recreational: {
                    id_user: userId,
                    id_place_recreational: placeId,
                },
            },
            update: {},
            create: {
                id_user: userId,
                id_place_recreational: placeId,
            },
        });
    }
    async removeFavorite(userId, placeId) {
        try {
            return await this.prisma.favorites.delete({
                where: {
                    id_user_id_place_recreational: {
                        id_user: userId,
                        id_place_recreational: placeId,
                    },
                },
            });
        }
        catch (e) {
            if (e?.code === 'P2025') {
                throw new common_1.NotFoundException('Favorite not found');
            }
            throw e;
        }
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map