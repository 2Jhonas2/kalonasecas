import { CreatePackagesActivityDto } from './dto/create-packages_activity.dto';
import { UpdatePackagesActivityDto } from './dto/update-packages_activity.dto';
export declare class PackagesActivitiesService {
    create(createPackagesActivityDto: CreatePackagesActivityDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePackagesActivityDto: UpdatePackagesActivityDto): string;
    remove(id: number): string;
}
