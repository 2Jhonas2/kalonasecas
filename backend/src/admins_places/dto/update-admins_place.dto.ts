import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminsPlaceDto } from './create-admins_place.dto';

export class UpdateAdminsPlaceDto extends PartialType(CreateAdminsPlaceDto) {}
