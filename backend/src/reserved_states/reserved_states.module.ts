import { Module } from '@nestjs/common';
import { ReservedStatesService } from './reserved_states.service';
import { ReservedStatesController } from './reserved_states.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReservedStatesController],
  providers: [ReservedStatesService],
})
export class ReservedStatesModule {}
