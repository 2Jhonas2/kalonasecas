import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from '@prisma/client';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<any | null>;
    findByEmailNormalized(email: string): Promise<users | null>;
    create(dto: CreateUserDto): Promise<users>;
    findAll(): Promise<users[]>;
    findOne(id_user: number): Promise<users | null>;
    update(id: number, dto: UpdateUserDto): Promise<users>;
    remove(id: number): Promise<users>;
    updatePhoto(id_user: number, file: Express.Multer.File): Promise<users>;
    updateVerificationStatus(userId: number, status: boolean): Promise<users>;
    updatePasswordResetToken(userId: number, tokenHash: string, expires: Date): Promise<users>;
    findByPasswordResetToken(tokenHash: string): Promise<users | null>;
    updatePassword(userId: number, newHashedPassword: string): Promise<users>;
    clearPasswordResetToken(userId: number): Promise<users>;
    updateLastLogoutAt(userId: number, date: Date): Promise<users>;
}
