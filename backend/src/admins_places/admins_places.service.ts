import { Injectable } from '@nestjs/common';
import { CreateAdminsPlaceDto } from './dto/create-admins_place.dto';
import { UpdateAdminsPlaceDto } from './dto/update-admins_place.dto';

@Injectable()
export class AdminsPlacesService {
  create(createAdminsPlaceDto: CreateAdminsPlaceDto) {
    return 'This action adds a new adminsPlace';
  }

  findAll() {
    return `This action returns all adminsPlaces`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminsPlace`;
  }

  update(id: number, updateAdminsPlaceDto: UpdateAdminsPlaceDto) {
    return `This action updates a #${id} adminsPlace`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminsPlace`;
  }
}
