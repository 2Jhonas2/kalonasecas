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
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NewsService = class NewsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const now = dto.createdAt ? new Date(dto.createdAt) : new Date();
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
    async findLatest(limit = 12) {
        const now = new Date();
        return this.prisma.news.findMany({
            where: { expiresAt: { gt: now } },
            orderBy: [{ createdAt: 'desc' }],
            take: Math.min(Math.max(limit, 1), 50),
        });
    }
    async purgeExpired() {
        const now = new Date();
        const { count } = await this.prisma.news.deleteMany({
            where: { expiresAt: { lte: now } },
        });
        return { purged: count };
    }
};
exports.NewsService = NewsService;
exports.NewsService = NewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NewsService);
//# sourceMappingURL=news.service.js.map