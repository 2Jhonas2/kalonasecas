import { CreateReservedStateDto } from './dto/create-reserved_state.dto';
import { UpdateReservedStateDto } from './dto/update-reserved_state.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ReservedStatesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(CreateReservedStateDto: CreateReservedStateDto): Promise<{
        id_reserve_state: number;
        state_name: string;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id_reserve_state: number;
        state_name: string;
    }[]>;
    findOne(id_reserved_state: number): string;
    update(id: number, _UpdateReservedStateDto: UpdateReservedStateDto): string;
    remove(id: number): string;
}
