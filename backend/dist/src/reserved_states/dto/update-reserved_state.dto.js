"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReservedStateDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_reserved_state_dto_1 = require("./create-reserved_state.dto");
class UpdateReservedStateDto extends (0, mapped_types_1.PartialType)(create_reserved_state_dto_1.CreateReservedStateDto) {
}
exports.UpdateReservedStateDto = UpdateReservedStateDto;
//# sourceMappingURL=update-reserved_state.dto.js.map