import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import type { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: process.env.NODE_ENV === 'production' ? [] : ['query', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Llamar una vez en main.ts:
  // const app = await NestFactory.create(AppModule);
  // app.get(PrismaService).enableShutdownHooks(app);
  enableShutdownHooks(app: INestApplication) {
    process.on('SIGINT', async () => {
      await app.close();
      process.exit(0);
    });
    process.on('SIGTERM', async () => {
      await app.close();
      process.exit(0);
    });
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
