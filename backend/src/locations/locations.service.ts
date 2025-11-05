import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DepartmentDto } from './dto/department.dto';
import { CityDto } from './dto/city.dto';
import { ClimateDto } from './dto/climate.dto'; // Import ClimateDto

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {} // Inject PrismaService

  async findAllDepartments(): Promise<DepartmentDto[]> {
    return this.prisma.departments.findMany({
      select: {
        id_department: true,
        name: true,
        code: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findCitiesByDepartment(departmentId: number): Promise<CityDto[]> {
    return this.prisma.cities.findMany({
      where: {
        id_department: departmentId,
      },
      select: {
        id_city: true,
        name: true,
        id_department: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findAllClimates(): Promise<ClimateDto[]> { // New method
    return this.prisma.climates.findMany({
      select: {
        id_climate: true,
        code: true,
        name: true,
        description: true,
        is_active: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
}
