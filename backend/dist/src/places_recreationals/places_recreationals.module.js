"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacesRecreationalsModule = void 0;
const common_1 = require("@nestjs/common");
const places_recreationals_controller_1 = require("./places_recreationals.controller");
const places_recreationals_service_1 = require("./places_recreationals.service");
const prisma_service_1 = require("../prisma/prisma.service");
const news_service_1 = require("../news/news.service");
let PlacesRecreationalsModule = class PlacesRecreationalsModule {
};
exports.PlacesRecreationalsModule = PlacesRecreationalsModule;
exports.PlacesRecreationalsModule = PlacesRecreationalsModule = __decorate([
    (0, common_1.Module)({
        controllers: [places_recreationals_controller_1.PlacesRecreationalsController],
        providers: [places_recreationals_service_1.PlacesRecreationalsService, prisma_service_1.PrismaService, news_service_1.NewsService],
        exports: [places_recreationals_service_1.PlacesRecreationalsService],
    })
], PlacesRecreationalsModule);
//# sourceMappingURL=places_recreationals.module.js.map