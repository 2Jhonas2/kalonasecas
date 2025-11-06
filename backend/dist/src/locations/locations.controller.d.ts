import { LocationsService } from './locations.service';
import { DepartmentDto } from './dto/department.dto';
import { CityDto } from './dto/city.dto';
import { ClimateDto } from './dto/climate.dto';
export declare class LocationsController {
    private readonly locationsService;
    constructor(locationsService: LocationsService);
    findAllDepartments(): Promise<DepartmentDto[]>;
    findCitiesByDepartment(departmentId: number): Promise<CityDto[]>;
    findAllClimates(): Promise<ClimateDto[]>;
}
