import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlacesRecreationalDto } from './dto/create-places_recreational.dto';
import { UpdatePlacesRecreationalDto } from './dto/update-places_recreational.dto';
import { NewsService } from '../news/news.service';
import { NewsType } from '../news/dto/create-news.dto';

@Injectable()
export class PlacesRecreationalsService {
  constructor(
    private prisma: PrismaService,
    private newsService: NewsService,
  ) {}

  private clean<T extends Record<string, any>>(obj: T): Partial<T> {
    return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Partial<T>;
  }

  async create(dto: CreatePlacesRecreationalDto, image?: Express.Multer.File) {
    const data: Prisma.places_recreationalsUncheckedCreateInput = {
      place_name: dto.place_name,
      ...(dto.direction !== undefined ? { direction: dto.direction } : {}),
      ...(dto.email_place_recreational !== undefined ? { email_place_recreational: dto.email_place_recreational } : {}),
      id_department: dto.id_department,
      id_city: dto.id_city,
      ...(dto.id_climate !== undefined ? { id_climate: dto.id_climate } : {}),
      ...(dto.id_user !== undefined ? { id_user: dto.id_user } : {}),
      ...(dto.short_description !== undefined ? { short_description: dto.short_description } : {}),
      ...(dto.keywords !== undefined ? { keywords: dto.keywords } : {}),
      ...(dto.search_name !== undefined ? { search_name: dto.search_name } : {}),
      ...(dto.price_from !== undefined ? { price_from: dto.price_from } : {}),
      ...(dto.latitude !== undefined ? { latitude: dto.latitude } : {}),
      ...(dto.longitude !== undefined ? { longitude: dto.longitude } : {}),
    };

    if (image) {
      data.image_url = `/uploads/${image.filename}`;
    }

    const createdPlace = await this.prisma.places_recreationals.create({ data });

    // 🔔 Crear noticia automática (usar enum + evitar nulls)
    await this.newsService.create({
      title: '¡Nuevo Destino Disponible!',
      description: `Explora un nuevo lugar increíble: ${createdPlace.place_name}. ${createdPlace.short_description || ''}`,
      type: NewsType.NEW_PLACE,
      entityId: createdPlace.id_place_recreational.toString(),
      imageUrl: createdPlace.image_url ?? undefined,
    });

    return createdPlace;
  }

  async findAll(id_climate?: number) {
    const where: Prisma.places_recreationalsWhereInput = {};
    if (id_climate !== undefined) where.id_climate = id_climate;

    return this.prisma.places_recreationals.findMany({
      where,
      orderBy: { id_place_recreational: 'desc' },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.places_recreationals.findUnique({
      where: { id_place_recreational: id },
    });
    if (!item) throw new NotFoundException('Place not found');
    return item;
  }

  async update(id: number, dto: UpdatePlacesRecreationalDto) {
    const data: Prisma.places_recreationalsUncheckedUpdateInput = this.clean({
      place_name: dto.place_name,
      direction: dto.direction,
      email_place_recreational: dto.email_place_recreational,
      id_department: dto.id_department,
      id_city: dto.id_city,
      id_climate: dto.id_climate,
      image_url: dto.image_url,
      short_description: dto.short_description,
      keywords: dto.keywords,
      search_name: dto.search_name,
      price_from: dto.price_from,
      id_user: dto.id_user,
      latitude: dto.latitude,
      longitude: dto.longitude,
    });

    try {
      return await this.prisma.places_recreationals.update({
        where: { id_place_recreational: id },
        data,
      });
    } catch (e: any) {
      if (e?.code === 'P2025') throw new NotFoundException('Place not found');
      throw e;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.places_recreationals.delete({
        where: { id_place_recreational: id },
      });
      return { ok: true, id };
    } catch (e: any) {
      if (e?.code === 'P2025') throw new NotFoundException('Place not found');
      throw e;
    }
  }
}
