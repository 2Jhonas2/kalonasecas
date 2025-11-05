import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { DepartmentDto } from './dto/department.dto';
import { CityDto } from './dto/city.dto';
import { ClimateDto } from './dto/climate.dto'; // Import ClimateDto

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('departments')
  async findAllDepartments(): Promise<DepartmentDto[]> {
    return this.locationsService.findAllDepartments();
  }

  @Get('cities/:departmentId')
  async findCitiesByDepartment(
    @Param('departmentId', ParseIntPipe) departmentId: number,
  ): Promise<CityDto[]> {
    return this.locationsService.findCitiesByDepartment(departmentId);
  }

  @Get('climates') // New endpoint
  async findAllClimates(): Promise<ClimateDto[]> {
    return this.locationsService.findAllClimates();
  }
}