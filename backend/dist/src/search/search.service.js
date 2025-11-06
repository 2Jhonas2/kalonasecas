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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SearchService = class SearchService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async search(params) {
        const { query, departmentId, cityId, categoryId, climateId, minPrice, maxPrice, take = 20, skip = 0, } = params;
        const AND = [{ is_active: true }];
        if (departmentId)
            AND.push({ id_department: Number(departmentId) });
        if (cityId)
            AND.push({ id_city: Number(cityId) });
        if (climateId)
            AND.push({ id_climate: Number(climateId) });
        if (minPrice != null || maxPrice != null) {
            AND.push({
                price_from: {
                    gte: minPrice ?? 0,
                    lte: maxPrice ?? 9_999_999_999,
                },
            });
        }
        if (categoryId) {
            AND.push({
                categories: { some: { id_category: Number(categoryId) } },
            });
        }
        const OR = [];
        if (query && query.trim()) {
            const q = query.trim();
            OR.push({ place_name: { contains: q, mode: "insensitive" } }, { short_description: { contains: q, mode: "insensitive" } }, { keywords: { contains: q, mode: "insensitive" } }, { search_name: { contains: q, mode: "insensitive" } }, {
                package_touristic: {
                    some: {
                        name_package_touristic: { contains: q, mode: "insensitive" },
                    },
                },
            });
        }
        const where = OR.length ? { AND, OR } : { AND };
        const [items, total] = await this.prisma.$transaction([
            this.prisma.places_recreationals.findMany({
                where,
                include: {
                    department: true,
                    city: true,
                    climate: true,
                    categories: { include: { category: true } },
                },
                orderBy: [
                    { rating_avg: "desc" },
                    { review_count: "desc" },
                    { price_from: "asc" },
                ],
                take,
                skip,
            }),
            this.prisma.places_recreationals.count({ where }),
        ]);
        return { items, total, take, skip };
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SearchService);
//# sourceMappingURL=search.service.js.map