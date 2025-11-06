import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ReservationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(CreateReservationDto: CreateReservationDto): Promise<{
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
    findOne(id_reservation: number): string;
    update(id: number, _UpdateReservationDto: UpdateReservationDto): string;
    remove(id: number): string;
}
