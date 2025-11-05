// src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
  import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

type PublicUser = {
  id_user: number;
  name_user: string;
  lastname_user?: string | null;
  email_user: string;
  id_role_user: number;
  isVerified: boolean;
  photo_user?: string | null;
  role_user?: { description: string };
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  private toPublicUser(u: any): PublicUser {
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

  /** ========== LOGIN / VALIDACIÓN ========== */
  async validateUser(
    email: string,
    password: string,
  ): Promise<{ user: PublicUser; token: string } | null> {
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

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    if (!user.isVerified) {
      throw new UnauthorizedException(
        '✅ Successful registration. Please check your email.',
      );
    }

    const token = this.jwtService.sign({
      userId: user.id_user,
      email: user.email_user,
    });

    return { user: this.toPublicUser(user), token };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ user: PublicUser; token: string }> {
    const result = await this.validateUser(email, password);
    if (!result) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return result;
  }

  generateToken(user: { id_user: number; email_user: string }): string {
    return this.jwtService.sign({
      userId: user.id_user,
      email: user.email_user,
    });
  }

  /** ========== REGISTRO / VERIFICACIÓN DE EMAIL ========== */
  async register(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const existingUser = await this.usersService.findByEmail(
      createUserDto.email_user,
    );
    if (existingUser) {
      throw new BadRequestException('El correo electrónico ya está registrado.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
      isVerified: false,
    });

    const verificationToken = this.jwtService.sign(
      { email: newUser.email_user },
      { expiresIn: '1d' },
    );

    await this.emailService.sendUserVerificationEmail(
      newUser.email_user,
      verificationToken,
      newUser.name_user
    );

    return {
      message: '✅ Successful registration. Please check your email.',
    };
  }

    async verifyEmail(token: string): Promise<{ message: string }> {
    try {
      const payload = this.jwtService.verify<{ email: string }>(token);

      const user = await this.usersService.findByEmail(payload.email);

      if (!user) {
        throw new BadRequestException(
          'Token de verificación inválido o usuario no encontrado.',
        );
      }

      if (user.isVerified) {
        return { message: 'Tu correo electrónico ya ha sido verificado.' };
      }

      await this.usersService.updateVerificationStatus(user.id_user, true);

      return {
        message:
          'Correo electrónico verificado con éxito. Ahora puedes iniciar sesión.',
      };
    } catch (error: any) {
      console.error('AuthService: verifyEmail - Error durante la verificación:', error);
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException(
          'El token de verificación ha expirado. Por favor, regístrate de nuevo para obtener un nuevo enlace.',
        );
      }
      throw new BadRequestException('Token de verificación inválido.');
    }
  }

  /** ========== OLVIDÉ MI CONTRASEÑA / RESET ========== */
  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(
        'No se encontró un usuario con ese correo electrónico.',
      );
    }

    // Genera token crudo y guarda su HASH (sha256) en DB
    const resetTokenRaw = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto
      .createHash('sha256')
      .update(resetTokenRaw)
      .digest('hex');

    const passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // +1h
    await this.usersService.updatePasswordResetToken(
      user.id_user,
      resetTokenHash,
      passwordResetExpires,
    );
    const resetUrl = `${this.configService.get<string>('FRONTEND_URL')}/reset-password?token=${resetTokenRaw}`;
    console.log('Generated password reset URL:', resetUrl);
    await this.emailService.sendPasswordResetEmail(user.email_user, resetUrl, user.name_user);

    return {
      message:
        '✅ Successful registration. Please check your email.',
    };
  }

  async resetPassword(
    tokenRaw: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const tokenHash = crypto.createHash('sha256').update(tokenRaw).digest('hex');

    const user = await this.usersService.findByPasswordResetToken(tokenHash);

    if (
      !user ||
      !user.passwordResetExpires ||
      user.passwordResetExpires < new Date()
    ) {
      throw new BadRequestException(
        'El token de restablecimiento de contraseña es inválido o ha expirado.',
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.usersService.updatePassword(user.id_user, hashedPassword);
    await this.usersService.clearPasswordResetToken(user.id_user);

    return {
      message:
        'Tu contraseña ha sido restablecida con éxito. Ahora puedes iniciar sesión.',
    };
  }

  async logoutAllDevices(userId: number): Promise<{ message: string }> {
    await this.usersService.updateLastLogoutAt(userId, new Date());
    return { message: 'All other sessions have been logged out.' };
  }
}