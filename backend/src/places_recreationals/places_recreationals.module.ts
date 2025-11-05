import { Module } from '@nestjs/common';
import { PlacesRecreationalsController } from './places_recreationals.controller';
import { PlacesRecreationalsService } from './places_recreationals.service';
import { PrismaService } from '../prisma/prisma.service';
import { NewsService } from '../news/news.service';

@Module({
  controllers: [PlacesRecreationalsController],
  providers: [PlacesRecreationalsService, PrismaService, NewsService],
  exports: [PlacesRecreationalsService],
})
export class PlacesRecreationalsModule {}
