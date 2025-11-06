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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const resend_1 = require("resend");
let EmailService = class EmailService {
    configService;
    resend;
    senderEmail;
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.get("RESEND_API_KEY");
        this.senderEmail = this.configService.get("SENDER_EMAIL") || "support@kalonitinere.site";
        this.resend = new resend_1.Resend(apiKey);
    }
    async sendUserVerificationEmail(to, token, name_user) {
        const backendUrl = this.configService.get("BACKEND_URL") || "http://localhost:3000";
        const verificationLink = `${backendUrl}/auth/verify-email?token=${token}`;
        try {
            await this.resend.emails.send({
                from: this.senderEmail,
                to,
                subject: "🎉 Bienvenido a Kalon Itínere – Tu aventura comienza aquí",
                html: `
          <div style="max-width: 600px; margin: auto; padding: 16px">
            <p>Hola ${name_user},</p>
            <p>¡Gracias por registrarte en Kalon Itínere! 🌍✈️</p>
            <p>Con tu cuenta podrás:<br/>
              ✅ Reservar paquetes turísticos de forma fácil y rápida.<br/>
              ✅ Acceder a promociones exclusivas.<br/>
              ✅ Gestionar tus viajes en un solo lugar.
            </p>
            <p>
              <a href="${verificationLink}" style="background-color:#fc0038;color:#fff;padding:8px 16px;border-radius:4px;text-decoration:none;">Verificar mi cuenta</a>
            </p>
            <p>Un cordial saludo,<br/>El equipo de Kalon Itínere</p>
          </div>
        `,
            });
            console.log(`Email sent successfully to ${to}`);
        }
        catch (error) {
            console.error(`Failed to send email to ${to}:`, error);
        }
    }
    async sendPasswordResetEmail(to, resetUrl, name_user) {
        try {
            await this.resend.emails.send({
                from: this.senderEmail,
                to,
                subject: "Restablece tu contraseña de Kalon-Itenere",
                html: `
          <div style="font-family: Arial; max-width:600px; margin:auto; padding:20px; border:1px solid #e0e0e0; border-radius:8px;">
            <h2 style="text-align:center;">🔐 Restablecimiento de Contraseña</h2>
            <p>Hola ${name_user},</p>
            <p>Has solicitado restablecer tu contraseña.</p>
            <div style="text-align:center; margin:30px 0;">
              <a href="${resetUrl}" style="background:#007bff;color:#fff;padding:12px 20px;border-radius:5px;text-decoration:none;">🔑 Restablecer mi contraseña</a>
            </div>
            <p>⚠️ Este enlace expirará en 1 hora.</p>
            <p>Si no solicitaste este cambio, ignora este correo.</p>
          </div>
        `,
            });
            console.log(`Password reset email sent successfully to ${to}`);
        }
        catch (error) {
            console.error(`Failed to send password reset email to ${to}:`, error);
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map