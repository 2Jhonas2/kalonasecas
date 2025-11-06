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
exports.LocationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LocationsService = class LocationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllDepartments() {
        return this.prisma.departments.findMany({
            select: {
                id_department: true,
                name: true,
                code: true,
            },
            orderBy: {
                name: 'asc',
            },
        });
    }
    async findCitiesByDepartment(departmentId) {
        return this.prisma.cities.findMany({
            where: {
                id_department: departmentId,
            },
            select: {
                id_city: true,
                name: true,
                id_department: true,
            },
            orderBy: {
                name: 'asc',
            },
        });
    }
    async findAllClimates() {
        return this.prisma.climates.findMany({
            select: {
                id_climate: true,
                code: true,
                name: true,
                description: true,
                is_active: true,
            },
            orderBy: {
                name: 'asc',
            },
        });
    }
};
exports.LocationsService = LocationsService;
exports.LocationsService = LocationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LocationsService);
//# sourceMappingURL=locations.service.js.map