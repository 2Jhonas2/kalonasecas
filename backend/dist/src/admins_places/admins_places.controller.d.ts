import { AdminsPlacesService } from './admins_places.service';
import { CreateAdminsPlaceDto } from './dto/create-admins_place.dto';
import { UpdateAdminsPlaceDto } from './dto/update-admins_place.dto';
export declare class AdminsPlacesController {
    private readonly adminsPlacesService;
    constructor(adminsPlacesService: AdminsPlacesService);
    create(createAdminsPlaceDto: CreateAdminsPlaceDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAdminsPlaceDto: UpdateAdminsPlaceDto): string;
    remove(id: string): string;
}
