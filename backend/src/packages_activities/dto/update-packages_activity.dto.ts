import { PartialType } from '@nestjs/mapped-types';
import { CreatePackagesActivityDto } from './create-packages_activity.dto';

export class UpdatePackagesActivityDto extends PartialType(CreatePackagesActivityDto) {}
