import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthController {
    private readonly authService;
    private readonly config;
    constructor(authService: AuthService, config: ConfigService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        user: {
            id_user: number;
            name_user: string;
            lastname_user?: string | null;
            email_user: string;
            id_role_user: number;
            isVerified: boolean;
            photo_user?: string | null;
            role_user?: {
                description: string;
            };
        };
        token: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    verifyEmail(token: string, res: Response): Promise<void>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    logoutAllDevices(user: any): Promise<{
        message: string;
    }>;
}
