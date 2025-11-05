import { Injectable } from '@nestjs/common';
import { CreatePackagesActivityDto } from './dto/create-packages_activity.dto';
import { UpdatePackagesActivityDto } from './dto/update-packages_activity.dto';

@Injectable()
export class PackagesActivitiesService {
  create(createPackagesActivityDto: CreatePackagesActivityDto) {
    return 'This action adds a new packagesActivity';
  }

  findAll() {
    return `This action returns all packagesActivities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} packagesActivity`;
  }

  update(id: number, updatePackagesActivityDto: UpdatePackagesActivityDto) {
    return `This action updates a #${id} packagesActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} packagesActivity`;
  }
}
