import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Endpoint raíz que ya tenías
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 🔹 Nuevo: endpoint de salud (útil para probar desde celular)
  @Get('health')
  health() {
    return { ok: true, timestamp: new Date().toISOString() };
  }

  // 🔹 Nuevo: endpoint para probar envíos de datos (ejemplo POST)
  @Post('echo')
  echo(@Body() body: any) {
    return { received: body, ts: new Date().toISOString() };
  }
}