"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesUsersModule = void 0;
const common_1 = require("@nestjs/common");
const roles_users_service_1 = require("./roles_users.service");
const roles_users_controller_1 = require("./roles_users.controller");
const prisma_module_1 = require("../prisma/prisma.module");
let RolesUsersModule = class RolesUsersModule {
};
exports.RolesUsersModule = RolesUsersModule;
exports.RolesUsersModule = RolesUsersModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [roles_users_controller_1.RolesUsersController],
        providers: [roles_users_service_1.RolesUsersService],
    })
], RolesUsersModule);
//# sourceMappingURL=roles_users.module.js.map