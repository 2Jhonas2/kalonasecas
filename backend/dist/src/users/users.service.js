"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByEmail(email) {
        const e = (email ?? '').trim();
        return this.prisma.users.findUnique({
            where: { email_user: e },
            include: {
                role_user: {
                    select: { description: true },
                },
            },
        });
    }
    async findByEmailNormalized(email) {
        const e = (email ?? '').trim();
        const el = e.toLowerCase();
        return this.prisma.users.findFirst({
            where: { OR: [{ email_user: el }, { email_user: e }] },
        });
    }
    async create(dto) {
        try {
            const number_document = Number(dto.number_document);
            const id_type_document = Number(dto.id_type_document);
            const id_role_user = dto.id_role_user ? Number(dto.id_role_user) : 1;
            if (!dto.name_user?.trim()) {
                throw new common_1.BadRequestException('name_user es requerido');
            }
            if (Number.isNaN(number_document)) {
                throw new common_1.BadRequestException('number_document inválido');
            }
            if (Number.isNaN(id_type_document)) {
                throw new common_1.BadRequestException('id_type_document inválido');
            }
            if (!dto.email_user?.trim()) {
                throw new common_1.BadRequestException('email_user es requerido');
            }
            if (!dto.password?.trim()) {
                throw new common_1.BadRequestException('password es requerido');
            }
            let password = dto.password.trim();
            if (!password.startsWith('$2a$') && !password.startsWith('$2b$')) {
                password = await bcrypt.hash(password, 10);
            }
            const data = {
                name_user: dto.name_user.trim(),
                lastname_user: dto.lastname_user?.trim() || undefined,
                number_document,
                id_type_document,
                email_user: dto.email_user.trim().toLowerCase(),
                password,
                id_role_user,
                direction_user: dto.direction_user?.trim() || undefined,
                isVerified: dto.isVerified ?? false,
                photo_user: dto['photo_user'] ||
                    'https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png',
            };
            if (dto.date_birth && String(dto.date_birth).trim() !== '') {
                data.date_birth = new Date(dto.date_birth);
            }
            return await this.prisma.users.create({ data });
        }
        catch (err) {
            console.error('❌ Error in users.create:', err);
            if (err.code === 'P2002') {
                const field = err.meta?.target?.[0] || 'field';
                throw new common_1.BadRequestException(`A user with that ${field} already exists.`);
            }
            if (err.code === 'P2003') {
                throw new common_1.BadRequestException(`The selected document type is invalid.`);
            }
            throw err;
        }
    }
    async findAll() {
        try {
            return await this.prisma.users.findMany({
                take: 100,
                include: {
                    role_user: {
                        select: { description: true },
                    },
                },
            });
        }
        catch (err) {
            console.error('❌ users.findAll error:', err);
            throw err;
        }
    }
    async findOne(id_user) {
        return this.prisma.users.findUnique({
            where: { id_user },
            include: {
                role_user: { select: { description: true } },
            },
        });
    }
    async update(id, dto) {
        const data = { ...dto };
        if (typeof data.email_user === 'string') {
            data.email_user = data.email_user.trim().toLowerCase();
        }
        if (typeof data.number_document === 'string') {
            data.number_document = Number(data.number_document);
        }
        if (typeof data.id_type_document === 'string') {
            data.id_type_document = Number(data.id_type_document);
        }
        if (typeof data.id_role_user === 'string') {
            data.id_role_user = Number(data.id_role_user);
        }
        if ('date_birth' in dto) {
            if (!dto.date_birth || String(dto.date_birth).trim() === '') {
                delete data.date_birth;
            }
            else {
                data.date_birth = new Date(dto.date_birth);
            }
        }
        return this.prisma.users.update({
            where: { id_user: id },
            data,
        });
    }
    async remove(id) {
        return this.prisma.users.delete({ where: { id_user: id } });
    }
    async updatePhoto(id_user, file) {
        console.log('UsersService: updatePhoto - Intentando actualizar foto para userId:', id_user);
        console.log('UsersService: updatePhoto - Objeto de archivo recibido:', file);
        const photo_user = `/uploads/${file.filename}`;
        console.log('UsersService: updatePhoto - Ruta de la foto construida:', photo_user);
        try {
            const updatedUser = await this.prisma.users.update({
                where: { id_user },
                data: { photo_user },
            });
            console.log('UsersService: updatePhoto - Foto actualizada con éxito para userId:', id_user);
            return updatedUser;
        }
        catch (error) {
            console.error('UsersService: updatePhoto - Error al actualizar foto para userId:', id_user, 'Error:', error);
            throw error;
        }
    }
    async updateVerificationStatus(userId, status) {
        console.log('UsersService: updateVerificationStatus - Intentando actualizar isVerified para userId:', userId, 'a estado:', status);
        try {
            const updatedUser = await this.prisma.users.update({
                where: { id_user: userId },
                data: { isVerified: status },
            });
            console.log('UsersService: updateVerificationStatus - Usuario actualizado:', updatedUser.id_user, 'isVerified:', updatedUser.isVerified);
            return updatedUser;
        }
        catch (error) {
            console.error('UsersService: updateVerificationStatus - Error al actualizar isVerified para userId:', userId, 'Error:', error);
            throw error;
        }
    }
    async updatePasswordResetToken(userId, tokenHash, expires) {
        return this.prisma.users.update({
            where: { id_user: userId },
            data: {
                passwordResetToken: tokenHash,
                passwordResetExpires: expires,
            },
        });
    }
    async findByPasswordResetToken(tokenHash) {
        return this.prisma.users.findFirst({
            where: {
                passwordResetToken: tokenHash,
                passwordResetExpires: { gt: new Date() },
            },
        });
    }
    async updatePassword(userId, newHashedPassword) {
        const password = newHashedPassword.startsWith('$2a$') || newHashedPassword.startsWith('$2b$')
            ? newHashedPassword
            : await bcrypt.hash(newHashedPassword, 10);
        return this.prisma.users.update({
            where: { id_user: userId },
            data: { password },
        });
    }
    async clearPasswordResetToken(userId) {
        return this.prisma.users.update({
            where: { id_user: userId },
            data: {
                passwordResetToken: null,
                passwordResetExpires: null,
            },
        });
    }
    async updateLastLogoutAt(userId, date) {
        return this.prisma.users.update({
            where: { id_user: userId },
            data: { lastLogoutAt: date },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map