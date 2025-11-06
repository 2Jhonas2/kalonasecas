"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClimateDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_climate_dto_1 = require("./create-climate.dto");
class UpdateClimateDto extends (0, mapped_types_1.PartialType)(create_climate_dto_1.CreateClimateDto) {
}
exports.UpdateClimateDto = UpdateClimateDto;
//# sourceMappingURL=update-climate.dto.js.map