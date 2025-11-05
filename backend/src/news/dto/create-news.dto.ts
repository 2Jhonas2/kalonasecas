import { IsDateString, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export enum NewsType {
  NEW_PACKAGE = 'NEW_PACKAGE',
  NEW_PLACE = 'NEW_PLACE',
  INFO = 'INFO',
}

export class CreateNewsDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsEnum(NewsType)
  type: NewsType;

  @IsOptional()
  @IsString()
  entityId?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  /** Opcional: días de vigencia; si no llega, se usa un default en el service */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  ttlDays?: number;

  /** Opcional: si quieres forzar createdAt/expira manualmente (no suele hacer falta) */
  @IsOptional() @IsDateString() createdAt?: string;
  @IsOptional() @IsDateString() expiresAt?: string;
}
