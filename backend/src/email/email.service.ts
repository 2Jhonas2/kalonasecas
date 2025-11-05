import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Resend } from "resend";

@Injectable()
export class EmailService {
  private resend: Resend;
  private senderEmail: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>("RESEND_API_KEY");
    this.senderEmail = this.configService.get<string>("SENDER_EMAIL") || "support@kalonitinere.site";
    this.resend = new Resend(apiKey);
  }

  async sendUserVerificationEmail(to: string, token: string, name_user: string) {
    const backendUrl = this.configService.get<string>("BACKEND_URL") || "http://localhost:3000";
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
    } catch (error) {
      console.error(`Failed to send email to ${to}:`, error);
    }
  }

  async sendPasswordResetEmail(to: string, resetUrl: string, name_user: string) {
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
    } catch (error) {
      console.error(`Failed to send password reset email to ${to}:`, error);
    }
  }
}
