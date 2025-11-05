import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReservationsService {

  constructor(private prisma: PrismaService) {}

  async create(CreateReservationDto: CreateReservationDto) {

      return await this.prisma.reservations.create({
                    data  : {
            id_reserve_state: 1, // Establece el estado de reserva a 1 (pendiente)
            date_state: new Date(CreateReservationDto.date_state),
            id_user: +CreateReservationDto.id_user,
            id_package_touristic: +CreateReservationDto.id_package_touristic,
            reservation_date: new Date(CreateReservationDto.reservation_date),
            number_of_people: +CreateReservationDto.number_of_people,
          }
      });
  }
  
  findAll() {
    return this.prisma.reservations.findMany();
  }

  findOne(id_reservation: number) {
    return `This action returns a #${id_reservation} reservacion`;
  }

  update(id: number, _UpdateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservacion`;
  }
}