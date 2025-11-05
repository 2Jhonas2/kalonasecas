import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClimatesController } from './climates.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ClimatesController],
})
export class ClimatesModule {}
