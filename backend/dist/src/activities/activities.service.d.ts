import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
export declare class ActivitiesService {
    create(createActivityDto: CreateActivityDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateActivityDto: UpdateActivityDto): string;
    remove(id: number): string;
}
