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
exports.PackagesTouristicsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const news_service_1 = require("../news/news.service");
const create_news_dto_1 = require("../news/dto/create-news.dto");
let PackagesTouristicsService = class PackagesTouristicsService {
    prisma;
    newsService;
    constructor(prisma, newsService) {
        this.prisma = prisma;
        this.newsService = newsService;
    }
    async create(data) {
        const createdPackage = await this.prisma.packages_touristics.create({
            data,
            include: {
                place_recreational: true,
            },
        });
        await this.newsService.create({
            title: '¡Nuevo Paquete Turístico!',
            description: `Descubre nuestro nuevo paquete: ${createdPackage.name_package_touristic}.`,
            type: create_news_dto_1.NewsType.NEW_PACKAGE,
            entityId: String(createdPackage.id_package_touristic),
            imageUrl: createdPackage.place_recreational?.image_url ?? undefined,
        });
        return createdPackage;
    }
    async findAll() {
        return this.prisma.packages_touristics.findMany({
            orderBy: { id_package_touristic: 'desc' },
        });
    }
    async findOne(id) {
        const item = await this.prisma.packages_touristics.findUnique({
            where: { id_package_touristic: id },
            include: { place_recreational: true },
        });
        if (!item)
            throw new common_1.NotFoundException('Package not found');
        return item;
    }
    async update(id, dto) {
        try {
            return await this.prisma.packages_touristics.update({
                where: { id_package_touristic: id },
                data: dto,
            });
        }
        catch (e) {
            if (e?.code === 'P2025')
                throw new common_1.NotFoundException('Package not found');
            throw e;
        }
    }
    async remove(id) {
        try {
            await this.prisma.packages_touristics.delete({
                where: { id_package_touristic: id },
            });
            return { ok: true, id };
        }
        catch (e) {
            if (e?.code === 'P2025')
                throw new common_1.NotFoundException('Package not found');
            throw e;
        }
    }
};
exports.PackagesTouristicsService = PackagesTouristicsService;
exports.PackagesTouristicsService = PackagesTouristicsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        news_service_1.NewsService])
], PackagesTouristicsService);
//# sourceMappingURL=packages_touristics.service.js.map