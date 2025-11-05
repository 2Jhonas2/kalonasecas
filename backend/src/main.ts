// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Cierre limpio Prisma/Nest
  const prisma = app.get(PrismaService);
  prisma.enableShutdownHooks(app);

  // CORS (ajusta origin si deseas restringir)
  app.enableCors({ origin: true, credentials: true });

  // Validación global + conversión implícita
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Asegura carpeta /uploads y sírvela como estático
  const uploadsPath = join(process.cwd(), 'uploads');
  if (!existsSync(uploadsPath)) mkdirSync(uploadsPath, { recursive: true });
  app.useStaticAssets(uploadsPath, { prefix: '/uploads/' });

  const PORT = Number(process.env.PORT) || 3000;
  const HOST = process.env.HOST || '0.0.0.0';

  await app.listen(PORT, HOST);
  const url = await app.getUrl();
  console.log(`🚀 Backend corriendo en ${url}`);
}
bootstrap();