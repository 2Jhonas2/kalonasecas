import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class RemoveFavoriteDto {
  @Type(() => Number) @IsInt()
  userId: number;
}
