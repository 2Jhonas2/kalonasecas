import { Module } from '@nestjs/common';
import { PackagesActivitiesService } from './packages_activities.service';
import { PackagesActivitiesController } from './packages_activities.controller';

@Module({
  controllers: [PackagesActivitiesController],
  providers: [PackagesActivitiesService],
})
export class PackagesActivitiesModule {}
