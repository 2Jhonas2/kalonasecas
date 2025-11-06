import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
export declare class CatalogService {
    create(createCatalogDto: CreateCatalogDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCatalogDto: UpdateCatalogDto): string;
    remove(id: number): string;
}
