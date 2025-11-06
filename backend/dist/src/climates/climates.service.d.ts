import { CreateClimateDto } from './dto/create-climate.dto';
import { UpdateClimateDto } from './dto/update-climate.dto';
export declare class ClimatesService {
    create(createClimateDto: CreateClimateDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateClimateDto: UpdateClimateDto): string;
    remove(id: number): string;
}
