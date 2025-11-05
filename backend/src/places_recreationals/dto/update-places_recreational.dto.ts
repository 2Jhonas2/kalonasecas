import { PartialType } from '@nestjs/mapped-types';
import { CreatePlacesRecreationalDto } from './create-places_recreational.dto';

export class UpdatePlacesRecreationalDto extends PartialType(CreatePlacesRecreationalDto) {}
