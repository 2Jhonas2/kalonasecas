import { PrismaService } from '../prisma/prisma.service';
import { DepartmentDto } from './dto/department.dto';
import { CityDto } from './dto/city.dto';
import { ClimateDto } from './dto/climate.dto';
export declare class LocationsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllDepartments(): Promise<DepartmentDto[]>;
    findCitiesByDepartment(departmentId: number): Promise<CityDto[]>;
    findAllClimates(): Promise<ClimateDto[]>;
}
