"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRolesUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_roles_user_dto_1 = require("./create-roles_user.dto");
class UpdateRolesUserDto extends (0, mapped_types_1.PartialType)(create_roles_user_dto_1.CreateRolesUserDto) {
}
exports.UpdateRolesUserDto = UpdateRolesUserDto;
//# sourceMappingURL=update-roles_user.dto.js.map