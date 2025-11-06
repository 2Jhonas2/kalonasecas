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
exports.PackagesActivitiesController = void 0;
const common_1 = require("@nestjs/common");
const packages_activities_service_1 = require("./packages_activities.service");
const create_packages_activity_dto_1 = require("./dto/create-packages_activity.dto");
const update_packages_activity_dto_1 = require("./dto/update-packages_activity.dto");
let PackagesActivitiesController = class PackagesActivitiesController {
    packagesActivitiesService;
    constructor(packagesActivitiesService) {
        this.packagesActivitiesService = packagesActivitiesService;
    }
    create(createPackagesActivityDto) {
        return this.packagesActivitiesService.create(createPackagesActivityDto);
    }
    findAll() {
        return this.packagesActivitiesService.findAll();
    }
    findOne(id) {
        return this.packagesActivitiesService.findOne(+id);
    }
    update(id, updatePackagesActivityDto) {
        return this.packagesActivitiesService.update(+id, updatePackagesActivityDto);
    }
    remove(id) {
        return this.packagesActivitiesService.remove(+id);
    }
};
exports.PackagesActivitiesController = PackagesActivitiesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_packages_activity_dto_1.CreatePackagesActivityDto]),
    __metadata("design:returntype", void 0)
], PackagesActivitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PackagesActivitiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PackagesActivitiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_packages_activity_dto_1.UpdatePackagesActivityDto]),
    __metadata("design:returntype", void 0)
], PackagesActivitiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PackagesActivitiesController.prototype, "remove", null);
exports.PackagesActivitiesController = PackagesActivitiesController = __decorate([
    (0, common_1.Controller)('packages-activities'),
    __metadata("design:paramtypes", [packages_activities_service_1.PackagesActivitiesService])
], PackagesActivitiesController);
//# sourceMappingURL=packages_activities.controller.js.map