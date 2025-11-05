// src/news/news.controller.ts
import { Controller, Get, Post, Body, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly service: NewsService) {}

  // PÚBLICO: últimas noticias (no expiradas)
  @Get()
  list(
    @Query('limit', new DefaultValuePipe(12), ParseIntPipe) limit: number, // ✅ evita 400 cuando no mandan ?limit
  ) {
    return this.service.findLatest(limit);
  }

  // (Opcional) Crear manualmente una noticia
  @Post()
  create(@Body() dto: CreateNewsDto) {
    return this.service.create(dto);
  }
}
