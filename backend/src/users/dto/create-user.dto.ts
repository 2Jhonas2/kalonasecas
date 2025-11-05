// src/users/dto/create-user.dto.ts
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateUserDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MinLength(1)
  name_user: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  lastname_user?: string;

  @Type(() => Number)
  @IsInt()
  number_document: number;

  @Type(() => Number)
  @IsInt()
  id_type_document: number;

  @IsDateString()
  @IsOptional()
  date_birth?: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  direction_user?: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  id_role_user?: number;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsEmail()
  email_user: string;

  @IsString()
  @MinLength(8)
  password: string;

  // 👇 Necesario para que compile auth.service.ts y users.service.ts
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;
}
