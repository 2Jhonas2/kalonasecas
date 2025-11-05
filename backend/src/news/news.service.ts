import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNewsDto, NewsType } from './dto/create-news.dto';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  /** Crear noticia (con TTL por defecto) */
  async create(dto: CreateNewsDto) {
    const now = dto.createdAt ? new Date(dto.createdAt) : new Date();

    // TTL por defecto (por ejemplo 21 días)
    const ttl = dto.ttlDays && dto.ttlDays > 0 ? dto.ttlDays : 21;
    const expiresAt = dto.expiresAt ? new Date(dto.expiresAt) : new Date(now.getTime() + ttl * 86400000);

    const created = await this.prisma.news.create({
      data: {
        title: dto.title,
        description: dto.description,
        type: dto.type,
        entityId: dto.entityId ?? null,
        imageUrl: dto.imageUrl ?? null,
        createdAt: now,
        expiresAt,
      },
    });

    return created;
  }

  /** Obtener últimas noticias no expiradas */
  async findLatest(limit = 12) {
    const now = new Date();
    return this.prisma.news.findMany({
      where: { expiresAt: { gt: now } },
      orderBy: [{ createdAt: 'desc' }],
      take: Math.min(Math.max(limit, 1), 50),
    });
  }

  /** (Opcional) Borrar expiradas (podrías llamarlo desde un cron si quieres) */
  async purgeExpired() {
    const now = new Date();
    const { count } = await this.prisma.news.deleteMany({
      where: { expiresAt: { lte: now } },
    });
    return { purged: count };
  }
}
