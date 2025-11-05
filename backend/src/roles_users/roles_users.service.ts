import { Injectable } from '@nestjs/common';
import { CreateRolesUserDto } from './dto/create-roles_user.dto';
import { UpdateRolesUserDto } from './dto/update-roles_user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesUsersService {

  constructor(private prisma: PrismaService) {}

  async create(CreateRolesUserDto: CreateRolesUserDto) {

      return await this.prisma.roles_users.create({
          data  : {
            description: CreateRolesUserDto.description,
          }
      });
  }
  
  findAll() {
    return this.prisma.roles_users.findMany();
  }

  findOne(id_role_user: number) {
    return `This action returns a #${id_role_user} rolesUser`;
  }

  update(id: number, _UpdateRolesUserDto: UpdateRolesUserDto) {
    return `This action updates a #${id} rolesUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolesUser`;
  }
}
