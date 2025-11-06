import { CreateRolesUserDto } from './dto/create-roles_user.dto';
import { UpdateRolesUserDto } from './dto/update-roles_user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class RolesUsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(CreateRolesUserDto: CreateRolesUserDto): Promise<{
        description: string;
        id_role_user: number;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        description: string;
        id_role_user: number;
    }[]>;
    findOne(id_role_user: number): string;
    update(id: number, _UpdateRolesUserDto: UpdateRolesUserDto): string;
    remove(id: number): string;
}
