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
exports.PlacesRecreationalsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const news_service_1 = require("../news/news.service");
const create_news_dto_1 = require("../news/dto/create-news.dto");
let PlacesRecreationalsService = class PlacesRecreationalsService {
    prisma;
    newsService;
    constructor(prisma, newsService) {
        this.prisma = prisma;
        this.newsService = newsService;
    }
    clean(obj) {
        return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
    }
    async create(dto, image) {
        const data = {
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
        await this.newsService.create({
            title: '¡Nuevo Destino Disponible!',
            description: `Explora un nuevo lugar increíble: ${createdPlace.place_name}. ${createdPlace.short_description || ''}`,
            type: create_news_dto_1.NewsType.NEW_PLACE,
            entityId: createdPlace.id_place_recreational.toString(),
            imageUrl: createdPlace.image_url ?? undefined,
        });
        return createdPlace;
    }
    async findAll(id_climate) {
        const where = {};
        if (id_climate !== undefined)
            where.id_climate = id_climate;
        return this.prisma.places_recreationals.findMany({
            where,
            orderBy: { id_place_recreational: 'desc' },
        });
    }
    async findOne(id) {
        const item = await this.prisma.places_recreationals.findUnique({
            where: { id_place_recreational: id },
        });
        if (!item)
            throw new common_1.NotFoundException('Place not found');
        return item;
    }
    async update(id, dto) {
        const data = this.clean({
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
        }
        catch (e) {
            if (e?.code === 'P2025')
                throw new common_1.NotFoundException('Place not found');
            throw e;
        }
    }
    async remove(id) {
        try {
            await this.prisma.places_recreationals.delete({
                where: { id_place_recreational: id },
            });
            return { ok: true, id };
        }
        catch (e) {
            if (e?.code === 'P2025')
                throw new common_1.NotFoundException('Place not found');
            throw e;
        }
    }
};
exports.PlacesRecreationalsService = PlacesRecreationalsService;
exports.PlacesRecreationalsService = PlacesRecreationalsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        news_service_1.NewsService])
], PlacesRecreationalsService);
//# sourceMappingURL=places_recreationals.service.js.map