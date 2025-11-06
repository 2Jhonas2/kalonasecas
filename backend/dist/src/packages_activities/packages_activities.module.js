"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackagesActivitiesModule = void 0;
const common_1 = require("@nestjs/common");
const packages_activities_service_1 = require("./packages_activities.service");
const packages_activities_controller_1 = require("./packages_activities.controller");
let PackagesActivitiesModule = class PackagesActivitiesModule {
};
exports.PackagesActivitiesModule = PackagesActivitiesModule;
exports.PackagesActivitiesModule = PackagesActivitiesModule = __decorate([
    (0, common_1.Module)({
        controllers: [packages_activities_controller_1.PackagesActivitiesController],
        providers: [packages_activities_service_1.PackagesActivitiesService],
    })
], PackagesActivitiesModule);
//# sourceMappingURL=packages_activities.module.js.map