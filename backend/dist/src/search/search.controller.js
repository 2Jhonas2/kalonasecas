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
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
const search_service_1 = require("./search.service");
let SearchController = class SearchController {
    service;
    constructor(service) {
        this.service = service;
    }
    async get(query, departmentId, cityId, categoryId, climateId, minPrice, maxPrice, take, skip) {
        return this.service.search({
            query,
            departmentId: departmentId ? Number(departmentId) : undefined,
            cityId: cityId ? Number(cityId) : undefined,
            categoryId: categoryId ? Number(categoryId) : undefined,
            climateId: climateId ? Number(climateId) : undefined,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
            take: take ? Number(take) : undefined,
            skip: skip ? Number(skip) : undefined,
        });
    }
};
exports.SearchController = SearchController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("query")),
    __param(1, (0, common_1.Query)("departmentId")),
    __param(2, (0, common_1.Query)("cityId")),
    __param(3, (0, common_1.Query)("categoryId")),
    __param(4, (0, common_1.Query)("climateId")),
    __param(5, (0, common_1.Query)("minPrice")),
    __param(6, (0, common_1.Query)("maxPrice")),
    __param(7, (0, common_1.Query)("take")),
    __param(8, (0, common_1.Query)("skip")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "get", null);
exports.SearchController = SearchController = __decorate([
    (0, common_1.Controller)("api/search"),
    __metadata("design:paramtypes", [search_service_1.SearchService])
], SearchController);
//# sourceMappingURL=search.controller.js.map