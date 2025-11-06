import { RolesUsersService } from './roles_users.service';
import { CreateRolesUserDto } from './dto/create-roles_user.dto';
import { UpdateRolesUserDto } from './dto/update-roles_user.dto';
export declare class RolesUsersController {
    private readonly rolesUsersService;
    constructor(rolesUsersService: RolesUsersService);
    create(createRolesUserDto: CreateRolesUserDto): Promise<{
        description: string;
        id_role_user: number;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        description: string;
        id_role_user: number;
    }[]>;
    findOne(id: string): string;
    update(id: string, updateRolesUserDto: UpdateRolesUserDto): string;
    remove(id: string): string;
}
