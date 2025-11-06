import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
export declare class ReservationsController {
    private readonly reservationsService;
    constructor(reservationsService: ReservationsService);
    create(createReservationDto: CreateReservationDto): Promise<{
        id_user: number;
        id_reserve_state: number;
        id_package_touristic: number;
        date_state: Date;
        reservation_date: Date;
        number_of_people: number;
        id_resertion: number;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id_user: number;
        id_reserve_state: number;
        id_package_touristic: number;
        date_state: Date;
        reservation_date: Date;
        number_of_people: number;
        id_resertion: number;
    }[]>;
    findOne(id: string): string;
    update(id: string, updateReservationDto: UpdateReservationDto): string;
    remove(id: string): string;
}
