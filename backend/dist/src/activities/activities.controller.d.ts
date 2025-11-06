import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
export declare class ActivitiesController {
    private readonly activitiesService;
    constructor(activitiesService: ActivitiesService);
    create(createActivityDto: CreateActivityDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateActivityDto: UpdateActivityDto): string;
    remove(id: string): string;
}
