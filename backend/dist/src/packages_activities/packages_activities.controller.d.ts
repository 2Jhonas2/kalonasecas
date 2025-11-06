import { PackagesActivitiesService } from './packages_activities.service';
import { CreatePackagesActivityDto } from './dto/create-packages_activity.dto';
import { UpdatePackagesActivityDto } from './dto/update-packages_activity.dto';
export declare class PackagesActivitiesController {
    private readonly packagesActivitiesService;
    constructor(packagesActivitiesService: PackagesActivitiesService);
    create(createPackagesActivityDto: CreatePackagesActivityDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePackagesActivityDto: UpdatePackagesActivityDto): string;
    remove(id: string): string;
}
