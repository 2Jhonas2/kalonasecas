"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsPlacesService = void 0;
const common_1 = require("@nestjs/common");
let AdminsPlacesService = class AdminsPlacesService {
    create(createAdminsPlaceDto) {
        return 'This action adds a new adminsPlace';
    }
    findAll() {
        return `This action returns all adminsPlaces`;
    }
    findOne(id) {
        return `This action returns a #${id} adminsPlace`;
    }
    update(id, updateAdminsPlaceDto) {
        return `This action updates a #${id} adminsPlace`;
    }
    remove(id) {
        return `This action removes a #${id} adminsPlace`;
    }
};
exports.AdminsPlacesService = AdminsPlacesService;
exports.AdminsPlacesService = AdminsPlacesService = __decorate([
    (0, common_1.Injectable)()
], AdminsPlacesService);
//# sourceMappingURL=admins_places.service.js.map