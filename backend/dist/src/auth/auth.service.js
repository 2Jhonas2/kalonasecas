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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const email_service_1 = require("../email/email.service");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
let AuthService = class AuthService {
    usersService;
    jwtService;
    emailService;
    configService;
    constructor(usersService, jwtService, emailService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.configService = configService;
    }
    toPublicUser(u) {
        return {
            id_user: u.id_user,
            name_user: u.name_user,
            lastname_user: u.lastname_user ?? null,
            email_user: u.email_user,
            id_role_user: u.id_role_user,
            isVerified: !!u.isVerified,
            photo_user: u.photo_user ?? null,
            role_user: u.role_user,
        };
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (process.env.NODE_ENV !== 'production') {
            console.log({
                found: !!user,
                dbEmail: user?.email_user,
                hasPass: !!user?.password,
                given: !!password,
                isVerified: user?.isVerified,
            });
        }
        if (!user)
            return null;
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return null;
        if (!user.isVerified) {
            throw new common_1.UnauthorizedException('✅ Successful registration. Please check your email.');
        }
        const token = this.jwtService.sign({
            userId: user.id_user,
            email: user.email_user,
        });
        return { user: this.toPublicUser(user), token };
    }
    async login(email, password) {
        const result = await this.validateUser(email, password);
        if (!result) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        return result;
    }
    generateToken(user) {
        return this.jwtService.sign({
            userId: user.id_user,
            email: user.email_user,
        });
    }
    async register(createUserDto) {
        const existingUser = await this.usersService.findByEmail(createUserDto.email_user);
        if (existingUser) {
            throw new common_1.BadRequestException('El correo electrónico ya está registrado.');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = await this.usersService.create({
            ...createUserDto,
            password: hashedPassword,
            isVerified: false,
        });
        const verificationToken = this.jwtService.sign({ email: newUser.email_user }, { expiresIn: '1d' });
        await this.emailService.sendUserVerificationEmail(newUser.email_user, verificationToken, newUser.name_user);
        return {
            message: '✅ Successful registration. Please check your email.',
        };
    }
    async verifyEmail(token) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.usersService.findByEmail(payload.email);
            if (!user) {
                throw new common_1.BadRequestException('Token de verificación inválido o usuario no encontrado.');
            }
            if (user.isVerified) {
                return { message: 'Tu correo electrónico ya ha sido verificado.' };
            }
            await this.usersService.updateVerificationStatus(user.id_user, true);
            return {
                message: 'Correo electrónico verificado con éxito. Ahora puedes iniciar sesión.',
            };
        }
        catch (error) {
            console.error('AuthService: verifyEmail - Error durante la verificación:', error);
            if (error?.name === 'TokenExpiredError') {
                throw new common_1.BadRequestException('El token de verificación ha expirado. Por favor, regístrate de nuevo para obtener un nuevo enlace.');
            }
            throw new common_1.BadRequestException('Token de verificación inválido.');
        }
    }
    async forgotPassword(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('No se encontró un usuario con ese correo electrónico.');
        }
        const resetTokenRaw = crypto.randomBytes(32).toString('hex');
        const resetTokenHash = crypto
            .createHash('sha256')
            .update(resetTokenRaw)
            .digest('hex');
        const passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
        await this.usersService.updatePasswordResetToken(user.id_user, resetTokenHash, passwordResetExpires);
        const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${resetTokenRaw}`;
        console.log('Generated password reset URL:', resetUrl);
        await this.emailService.sendPasswordResetEmail(user.email_user, resetUrl, user.name_user);
        return {
            message: '✅ Successful registration. Please check your email.',
        };
    }
    async resetPassword(tokenRaw, newPassword) {
        const tokenHash = crypto.createHash('sha256').update(tokenRaw).digest('hex');
        const user = await this.usersService.findByPasswordResetToken(tokenHash);
        if (!user ||
            !user.passwordResetExpires ||
            user.passwordResetExpires < new Date()) {
            throw new common_1.BadRequestException('El token de restablecimiento de contraseña es inválido o ha expirado.');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.usersService.updatePassword(user.id_user, hashedPassword);
        await this.usersService.clearPasswordResetToken(user.id_user);
        return {
            message: 'Tu contraseña ha sido restablecida con éxito. Ahora puedes iniciar sesión.',
        };
    }
    async logoutAllDevices(userId) {
        await this.usersService.updateLastLogoutAt(userId, new Date());
        return { message: 'All other sessions have been logged out.' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        email_service_1.EmailService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map