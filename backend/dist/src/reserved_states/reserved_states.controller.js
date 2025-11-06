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
exports.ReservedStatesController = void 0;
const common_1 = require("@nestjs/common");
const reserved_states_service_1 = require("./reserved_states.service");
const create_reserved_state_dto_1 = require("./dto/create-reserved_state.dto");
const update_reserved_state_dto_1 = require("./dto/update-reserved_state.dto");
let ReservedStatesController = class ReservedStatesController {
    reservedStatesService;
    constructor(reservedStatesService) {
        this.reservedStatesService = reservedStatesService;
    }
    create(createReservedStateDto) {
        return this.reservedStatesService.create(createReservedStateDto);
    }
    findAll() {
        return this.reservedStatesService.findAll();
    }
    findOne(id) {
        return this.reservedStatesService.findOne(+id);
    }
    update(id, updateReservedStateDto) {
        return this.reservedStatesService.update(+id, updateReservedStateDto);
    }
    remove(id) {
        return this.reservedStatesService.remove(+id);
    }
};
exports.ReservedStatesController = ReservedStatesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reserved_state_dto_1.CreateReservedStateDto]),
    __metadata("design:returntype", void 0)
], ReservedStatesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReservedStatesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReservedStatesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_reserved_state_dto_1.UpdateReservedStateDto]),
    __metadata("design:returntype", void 0)
], ReservedStatesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReservedStatesController.prototype, "remove", null);
exports.ReservedStatesController = ReservedStatesController = __decorate([
    (0, common_1.Controller)('reserved-states'),
    __metadata("design:paramtypes", [reserved_states_service_1.ReservedStatesService])
], ReservedStatesController);
//# sourceMappingURL=reserved_states.controller.js.map