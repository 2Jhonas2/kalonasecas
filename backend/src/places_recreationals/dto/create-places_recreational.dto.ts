import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlacesRecreationalDto {
  @IsString()
  @IsNotEmpty()
  place_name: string;

  @IsOptional()
  @IsString()
  direction?: string;

  @IsOptional()
  @IsEmail()
  email_place_recreational?: string;

  @Type(() => Number)
  @IsInt()
  id_department: number;

  @Type(() => Number)
  @IsInt()
  id_city: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id_climate?: number;

  // El archivo llega por Multer, image_url se setea en el service
  @IsOptional()
  @IsString()
  image_url?: string;

  @IsOptional()
  @IsString()
  short_description?: string;

  @IsOptional()
  @IsString()
  keywords?: string;

  @IsOptional()
  @IsString()
  search_name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price_from?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id_user?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  longitude?: number;
}
