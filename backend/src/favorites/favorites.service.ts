import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getUserFavoriteIds(userId: number) {
    const rows = await this.prisma.favorites.findMany({
      where: { id_user: userId },
      select: { id_place_recreational: true },
      orderBy: { id_favorite: 'desc' },
    });
    return rows.map((r) => r.id_place_recreational);
  }

  async addFavorite(userId: number, placeId: number) {
    // upsert por la clave compuesta nombrada
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

  async removeFavorite(userId: number, placeId: number) {
    try {
      return await this.prisma.favorites.delete({
        where: {
          id_user_id_place_recreational: {
            id_user: userId,
            id_place_recreational: placeId,
          },
        },
      });
    } catch (e: any) {
      // Si no existe, normaliza a 404 claro
      if (e?.code === 'P2025') {
        throw new NotFoundException('Favorite not found');
      }
      throw e;
    }
  }
}
