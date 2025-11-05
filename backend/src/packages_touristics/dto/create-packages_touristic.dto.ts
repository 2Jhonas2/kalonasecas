import { IsInt, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreatePackagesTouristicDto {
  @IsString()
  @IsNotEmpty()
  name_package_touristic: string;

  @IsString()
  @IsNotEmpty()
  description_package_touristic: string;

  // Acepta 'YYYY-MM-DD' o ISO 8601; en el service lo convertimos a Date
  @IsDateString()
  days_durations: string;

  @IsInt()
  price_package_touristic: number;

  @IsInt()
  @IsOptional()
  id_place_recreational?: number;

  // ⚠️ En tu Prisma actual es REQUERIDO
  @IsInt()
  id_climate: number;
}