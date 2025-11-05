import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminsPlacesService } from './admins_places.service';
import { CreateAdminsPlaceDto } from './dto/create-admins_place.dto';
import { UpdateAdminsPlaceDto } from './dto/update-admins_place.dto';

@Controller('admins-places')
export class AdminsPlacesController {
  constructor(private readonly adminsPlacesService: AdminsPlacesService) {}

  @Post()
  create(@Body() createAdminsPlaceDto: CreateAdminsPlaceDto) {
    return this.adminsPlacesService.create(createAdminsPlaceDto);
  }

  @Get()
  findAll() {
    return this.adminsPlacesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminsPlacesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminsPlaceDto: UpdateAdminsPlaceDto) {
    return this.adminsPlacesService.update(+id, updateAdminsPlaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsPlacesService.remove(+id);
  }
}
