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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CatalogController = class CatalogController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async deps() {
        return this.prisma.departments.findMany({ orderBy: { name: "asc" } });
    }
    async cities(departmentId) {
        if (!departmentId)
            return [];
        return this.prisma.cities.findMany({
            where: { id_department: Number(departmentId) },
            orderBy: { name: "asc" },
        });
    }
    async climates() {
        return this.prisma.climates.findMany({
            where: { is_active: true },
            orderBy: { name: "asc" },
        });
    }
    async categories() {
        return this.prisma.categories.findMany({ orderBy: { name: "asc" } });
    }
};
exports.CatalogController = CatalogController;
__decorate([
    (0, common_1.Get)("departments"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "deps", null);
__decorate([
    (0, common_1.Get)("cities"),
    __param(0, (0, common_1.Query)("departmentId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "cities", null);
__decorate([
    (0, common_1.Get)("climates"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "climates", null);
__decorate([
    (0, common_1.Get)("categories"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "categories", null);
exports.CatalogController = CatalogController = __decorate([
    (0, common_1.Controller)("api/catalog"),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CatalogController);
//# sourceMappingURL=catalog.controller.js.map