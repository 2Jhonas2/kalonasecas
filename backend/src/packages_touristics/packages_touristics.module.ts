import { Module } from '@nestjs/common';
import { PackagesTouristicsController } from './packages_touristics.controller';
import { PackagesTouristicsService } from './packages_touristics.service';
import { PrismaService } from '../prisma/prisma.service';
import { NewsService } from '../news/news.service';

@Module({
  controllers: [PackagesTouristicsController],
  providers: [PackagesTouristicsService, PrismaService, NewsService],
  exports: [PackagesTouristicsService],
})
export class PackagesTouristicsModule {}