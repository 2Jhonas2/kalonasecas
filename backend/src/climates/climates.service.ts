import { Injectable } from '@nestjs/common';
import { CreateClimateDto } from './dto/create-climate.dto';
import { UpdateClimateDto } from './dto/update-climate.dto';

@Injectable()
export class ClimatesService {
  create(createClimateDto: CreateClimateDto) {
    return 'This action adds a new climate';
  }

  findAll() {
    return `This action returns all climates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} climate`;
  }

  update(id: number, updateClimateDto: UpdateClimateDto) {
    return `This action updates a #${id} climate`;
  }

  remove(id: number) {
    return `This action removes a #${id} climate`;
  }
}
