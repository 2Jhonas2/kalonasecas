import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFavoriteDto {
  @Type(() => Number)
  @IsInt()
  userId: number;

  @Type(() => Number)
  @IsInt()
  id_place_recreational: number;
}
