import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  Query,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { User } from './user.decorator';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { email: string; password: string }) {
    const result = await this.authService.login(body.email, body.password);
    if (!result) throw new UnauthorizedException('Credenciales inválidas');
    return result;
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string, @Res() res: Response): Promise<void> {
    const frontend = this.config.get<string>('FRONTEND_URL') ?? '';
    try {
      await this.authService.verifyEmail(token);
      res.redirect(`${frontend}/verification-success`);
    } catch (error: any) {
      const msg = encodeURIComponent(error?.message ?? 'Error de verificación desconocido.');
      res.redirect(`${frontend}/verification-failure?message=${msg}`);
    }
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.newPassword,
    );
  }

  @Post('logout-all')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async logoutAllDevices(@User() user: any) {
    const userId = user.id_user;
    await this.authService.logoutAllDevices(userId);
    return { message: 'Logged out from all other devices successfully.' };
  }
}