import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('climates')
export class ClimatesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async list() {
    return this.prisma.climates.findMany({
      where: { is_active: true },
      orderBy: { id_climate: 'asc' },
      select: { id_climate: true, code: true, name: true, description: true },
    });
  }
}
