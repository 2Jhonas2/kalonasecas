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
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReservationsService = class ReservationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(CreateReservationDto) {
        return await this.prisma.reservations.create({
            data: {
                id_reserve_state: 1,
                date_state: new Date(CreateReservationDto.date_state),
                id_user: +CreateReservationDto.id_user,
                id_package_touristic: +CreateReservationDto.id_package_touristic,
                reservation_date: new Date(CreateReservationDto.reservation_date),
                number_of_people: +CreateReservationDto.number_of_people,
            }
        });
    }
    findAll() {
        return this.prisma.reservations.findMany();
    }
    findOne(id_reservation) {
        return `This action returns a #${id_reservation} reservacion`;
    }
    update(id, _UpdateReservationDto) {
        return `This action updates a #${id} reservacion`;
    }
    remove(id) {
        return `This action removes a #${id} reservacion`;
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map