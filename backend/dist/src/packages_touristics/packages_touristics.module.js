"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackagesTouristicsModule = void 0;
const common_1 = require("@nestjs/common");
const packages_touristics_controller_1 = require("./packages_touristics.controller");
const packages_touristics_service_1 = require("./packages_touristics.service");
const prisma_service_1 = require("../prisma/prisma.service");
const news_service_1 = require("../news/news.service");
let PackagesTouristicsModule = class PackagesTouristicsModule {
};
exports.PackagesTouristicsModule = PackagesTouristicsModule;
exports.PackagesTouristicsModule = PackagesTouristicsModule = __decorate([
    (0, common_1.Module)({
        controllers: [packages_touristics_controller_1.PackagesTouristicsController],
        providers: [packages_touristics_service_1.PackagesTouristicsService, prisma_service_1.PrismaService, news_service_1.NewsService],
        exports: [packages_touristics_service_1.PackagesTouristicsService],
    })
], PackagesTouristicsModule);
//# sourceMappingURL=packages_touristics.module.js.map