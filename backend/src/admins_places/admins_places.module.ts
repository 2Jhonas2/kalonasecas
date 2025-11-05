import { Module } from '@nestjs/common';
import { AdminsPlacesService } from './admins_places.service';
import { AdminsPlacesController } from './admins_places.controller';

@Module({
  controllers: [AdminsPlacesController],
  providers: [AdminsPlacesService],
})
export class AdminsPlacesModule {}
