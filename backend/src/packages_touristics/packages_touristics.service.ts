import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { NewsService } from '../news/news.service';
import { NewsType } from '../news/dto/create-news.dto';

@Injectable()
export class PackagesTouristicsService {
  constructor(
    private prisma: PrismaService,
    private newsService: NewsService,
  ) {}

  // Ajusta la firma si usas DTO propio; aquí uso el unchecked de Prisma solo a modo de ejemplo.
  async create(data: Prisma.packages_touristicsUncheckedCreateInput) {
    // Trae también el place para poder leer su image_url
    const createdPackage = await this.prisma.packages_touristics.create({
      data,
      include: {
        place_recreational: true,
      },
    });

    // 🔔 Noticia automática (enum + evitar null)
    await this.newsService.create({
      title: '¡Nuevo Paquete Turístico!',
      description: `Descubre nuestro nuevo paquete: ${createdPackage.name_package_touristic}.`,
      type: NewsType.NEW_PACKAGE,
      entityId: String(createdPackage.id_package_touristic),
      // 👇 Usa image_url (snake_case); coalesce a undefined para respetar el tipo del DTO
      imageUrl: createdPackage.place_recreational?.image_url ?? undefined,
    });

    return createdPackage;
  }

  // --- ejemplos de otros métodos (opcional) ---
  async findAll() {
    return this.prisma.packages_touristics.findMany({
      orderBy: { id_package_touristic: 'desc' },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.packages_touristics.findUnique({
      where: { id_package_touristic: id },
      include: { place_recreational: true },
    });
    if (!item) throw new NotFoundException('Package not found');
    return item;
  }

  async update(id: number, dto: Partial<Prisma.packages_touristicsUncheckedUpdateInput>) {
    try {
      return await this.prisma.packages_touristics.update({
        where: { id_package_touristic: id },
        data: dto,
      });
    } catch (e: any) {
      if (e?.code === 'P2025') throw new NotFoundException('Package not found');
      throw e;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.packages_touristics.delete({
        where: { id_package_touristic: id },
      });
      return { ok: true, id };
    } catch (e: any) {
      if (e?.code === 'P2025') throw new NotFoundException('Package not found');
      throw e;
    }
  }
}
