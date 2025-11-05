import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';

@Module({
  imports: [
    PrismaModule,
    // Config central de subida de archivos (foto de usuario)
    MulterModule.register({
      dest: join(process.cwd(), 'uploads'),
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB (alinea con el validador del controller)
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
