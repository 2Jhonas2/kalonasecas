import { PartialType } from '@nestjs/mapped-types';
import { CreatePackagesTouristicDto } from './create-packages_touristic.dto';

export class UpdatePackagesTouristicDto extends PartialType(CreatePackagesTouristicDto) {}
