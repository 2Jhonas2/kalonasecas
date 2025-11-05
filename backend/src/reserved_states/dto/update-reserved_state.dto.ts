import { PartialType } from '@nestjs/mapped-types';
import { CreateReservedStateDto } from './create-reserved_state.dto';

export class UpdateReservedStateDto extends PartialType(CreateReservedStateDto) {}
