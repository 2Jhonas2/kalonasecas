import { CreateAdminsPlaceDto } from './dto/create-admins_place.dto';
import { UpdateAdminsPlaceDto } from './dto/update-admins_place.dto';
export declare class AdminsPlacesService {
    create(createAdminsPlaceDto: CreateAdminsPlaceDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAdminsPlaceDto: UpdateAdminsPlaceDto): string;
    remove(id: number): string;
}
