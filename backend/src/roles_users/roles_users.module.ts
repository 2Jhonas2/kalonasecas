import { Module } from '@nestjs/common';
import { RolesUsersService } from './roles_users.service';
import { RolesUsersController } from './roles_users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RolesUsersController],
  providers: [RolesUsersService],
})
export class RolesUsersModule {}
