import { IsEmail, IsInt, IsOptional, IsString, MinLength, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString() @MinLength(1)
  name_user: string;

  @IsString() @IsOptional()
  lastname_user?: string;

  @Type(() => Number) @IsInt()
  number_document: number;

  @Type(() => Number) @IsInt()
  id_type_document: number;

  @IsDateString() @IsOptional()
  date_birth?: string;

  @IsString() @IsOptional()
  direction_user?: string;

  @Type(() => Number) @IsInt() @IsOptional()
  id_role_user?: number;

  @IsEmail()
  email_user: string;

  @IsString() @MinLength(8)
  password: string;
}
