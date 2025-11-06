import { ReservedStatesService } from './reserved_states.service';
import { CreateReservedStateDto } from './dto/create-reserved_state.dto';
import { UpdateReservedStateDto } from './dto/update-reserved_state.dto';
export declare class ReservedStatesController {
    private readonly reservedStatesService;
    constructor(reservedStatesService: ReservedStatesService);
    create(createReservedStateDto: CreateReservedStateDto): Promise<{
        id_reserve_state: number;
        state_name: string;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id_reserve_state: number;
        state_name: string;
    }[]>;
    findOne(id: string): string;
    update(id: string, updateReservedStateDto: UpdateReservedStateDto): string;
    remove(id: string): string;
}
