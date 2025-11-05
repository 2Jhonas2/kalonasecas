import { Injectable } from '@nestjs/common';
import { CreateReservedStateDto } from './dto/create-reserved_state.dto';
import { UpdateReservedStateDto } from './dto/update-reserved_state.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReservedStatesService {

  constructor(private prisma: PrismaService) {}

  async create(CreateReservedStateDto: CreateReservedStateDto) {

      return await this.prisma.reserved_states.create({
          data  : {
            state_name: CreateReservedStateDto.state_name,
          }
      });
  }
  
  findAll() {
    return this.prisma.reserved_states.findMany();
  }

  findOne(id_reserved_state: number) {
    return `This action returns a #${id_reserved_state} estado reservado`;
  }

  update(id: number, _UpdateReservedStateDto: UpdateReservedStateDto) {
    return `This action updates a #${id} estado reservado`;
  }

  remove(id: number) {
    return `This action removes a #${id} estado reservado`;
  }
}