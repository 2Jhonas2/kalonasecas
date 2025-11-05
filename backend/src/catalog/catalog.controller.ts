import { Controller, Get, Query } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Controller("api/catalog")
export class CatalogController {
  constructor(private prisma: PrismaService) {}

  @Get("departments")
  async deps() {
    return this.prisma.departments.findMany({ orderBy: { name: "asc" } });
  }

  @Get("cities")
  async cities(@Query("departmentId") departmentId?: string) {
    if (!departmentId) return [];
    return this.prisma.cities.findMany({
      where: { id_department: Number(departmentId) },
      orderBy: { name: "asc" },
    });
  }

  @Get("climates")
  async climates() {
    return this.prisma.climates.findMany({
      where: { is_active: true },
      orderBy: { name: "asc" },
    });
  }

  @Get("categories")
  async categories() {
    return this.prisma.categories.findMany({ orderBy: { name: "asc" } });
  }
}
