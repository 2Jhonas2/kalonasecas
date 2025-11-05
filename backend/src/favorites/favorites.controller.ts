import { Controller, Get, Query, ParseIntPipe, Post, Body, Delete, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly service: FavoritesService) {}

  // GET /favorites/ids?userId=2
  @Get('ids')
  getIds(@Query('userId', ParseIntPipe) userId: number) {
    return this.service.getUserFavoriteIds(userId);
  }

  // POST /favorites
  // body: { userId, id_place_recreational }
  @Post()
  add(@Body() dto: CreateFavoriteDto) {
    return this.service.addFavorite(dto.userId, dto.id_place_recreational);
  }

  // DELETE /favorites/:placeId?userId=2
  @Delete(':placeId')
  remove(
    @Param('placeId', ParseIntPipe) placeId: number,
    @Query('userId', ParseIntPipe) userId: number,
  ) {
    return this.service.removeFavorite(userId, placeId);
  }
}
