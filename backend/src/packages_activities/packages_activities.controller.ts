import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PackagesActivitiesService } from './packages_activities.service';
import { CreatePackagesActivityDto } from './dto/create-packages_activity.dto';
import { UpdatePackagesActivityDto } from './dto/update-packages_activity.dto';

@Controller('packages-activities')
export class PackagesActivitiesController {
  constructor(private readonly packagesActivitiesService: PackagesActivitiesService) {}

  @Post()
  create(@Body() createPackagesActivityDto: CreatePackagesActivityDto) {
    return this.packagesActivitiesService.create(createPackagesActivityDto);
  }

  @Get()
  findAll() {
    return this.packagesActivitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packagesActivitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackagesActivityDto: UpdatePackagesActivityDto) {
    return this.packagesActivitiesService.update(+id, updatePackagesActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packagesActivitiesService.remove(+id);
  }
}
