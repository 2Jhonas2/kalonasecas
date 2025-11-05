import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

type SearchParams = {
  query?: string;
  departmentId?: number;
  cityId?: number;
  categoryId?: number;
  climateId?: number;
  minPrice?: number;
  maxPrice?: number;
  take?: number;
  skip?: number;
};

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(params: SearchParams) {
    const {
      query,
      departmentId,
      cityId,
      categoryId,
      climateId,
      minPrice,
      maxPrice,
      take = 20,
      skip = 0,
    } = params;

    const AND: any[] = [{ is_active: true }];

    if (departmentId) AND.push({ id_department: Number(departmentId) });
    if (cityId) AND.push({ id_city: Number(cityId) });
    if (climateId) AND.push({ id_climate: Number(climateId) });
    if (minPrice != null || maxPrice != null) {
      AND.push({
        price_from: {
          gte: minPrice ?? 0,
          lte: maxPrice ?? 9_999_999_999,
        },
      });
    }
    if (categoryId) {
      AND.push({
        categories: { some: { id_category: Number(categoryId) } },
      });
    }

    const OR: any[] = [];
    if (query && query.trim()) {
      const q = query.trim();
      OR.push(
        { place_name: { contains: q, mode: "insensitive" } },
        { short_description: { contains: q, mode: "insensitive" } },
        { keywords: { contains: q, mode: "insensitive" } },
        { search_name: { contains: q, mode: "insensitive" } },
        {
          package_touristic: {
            some: {
              name_package_touristic: { contains: q, mode: "insensitive" },
            },
          },
        }
      );
    }

    const where = OR.length ? { AND, OR } : { AND };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.places_recreationals.findMany({
        where,
        include: {
          department: true,
          city: true,
          climate: true,
          categories: { include: { category: true } },
        },
        orderBy: [
          { rating_avg: "desc" },
          { review_count: "desc" },
          { price_from: "asc" },
        ],
        take,
        skip,
      }),
      this.prisma.places_recreationals.count({ where }),
    ]);

    return { items, total, take, skip };
  }
}
