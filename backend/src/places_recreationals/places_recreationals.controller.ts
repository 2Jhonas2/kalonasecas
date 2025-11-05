// src/places_recreationals/places_recreationals.controller.ts
import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  ParseIntPipe, UseInterceptors, UploadedFile, UsePipes,
  ValidationPipe, Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, FileFilterCallback } from 'multer';
import { extname } from 'path';
import { Request } from 'express';

import { PlacesRecreationalsService } from './places_recreationals.service';
import { CreatePlacesRecreationalDto } from './dto/create-places_recreational.dto';
import { UpdatePlacesRecreationalDto } from './dto/update-places_recreational.dto';

// ✅ filename SIEMPRE pasa un string (no opcional)
function fileNameUnique(
  _req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, filename: string) => void,
): void {
  const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = extname(file.originalname || '').toLowerCase();
  cb(null, `${unique}${ext}`);
}

// ✅ fileFilter con tipado correcto
function imageFilter(
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
): void {
  if (!file.mimetype || !file.mimetype.startsWith('image/')) {
    return cb(null, false);
  }
  cb(null, true);
}

@Controller('places-recreationals')
export class PlacesRecreationalsController {
  constructor(private readonly service: PlacesRecreationalsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: fileNameUnique, // ← ahora cumple la firma
      }),
      fileFilter: imageFilter,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }),
  )
  @UsePipes(new ValidationPipe({ transform: true }))
  create(
    @Body() dto: CreatePlacesRecreationalDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.service.create(dto, image);
  }

  @Get()
  findAll(@Query('id_climate') id_climate?: string) {
    return this.service.findAll(id_climate ? +id_climate : undefined);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePlacesRecreationalDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
