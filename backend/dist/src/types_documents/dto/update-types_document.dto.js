"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTypesDocumentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_types_document_dto_1 = require("./create-types_document.dto");
class UpdateTypesDocumentDto extends (0, mapped_types_1.PartialType)(create_types_document_dto_1.CreateTypesDocumentDto) {
}
exports.UpdateTypesDocumentDto = UpdateTypesDocumentDto;
//# sourceMappingURL=update-types_document.dto.js.map