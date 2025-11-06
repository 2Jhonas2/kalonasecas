import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../users/dto/create-user.dto';
type PublicUser = {
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
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly emailService;
    private readonly configService;
    constructor(usersService: UsersService, jwtService: JwtService, emailService: EmailService, configService: ConfigService);
    private toPublicUser;
    validateUser(email: string, password: string): Promise<{
        user: PublicUser;
        token: string;
    } | null>;
    login(email: string, password: string): Promise<{
        user: PublicUser;
        token: string;
    }>;
    generateToken(user: {
        id_user: number;
        email_user: string;
    }): string;
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(tokenRaw: string, newPassword: string): Promise<{
        message: string;
    }>;
    logoutAllDevices(userId: number): Promise<{
        message: string;
    }>;
}
export {};
