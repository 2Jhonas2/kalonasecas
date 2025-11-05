import { Controller, Get, Query } from "@nestjs/common";
import { SearchService } from "./search.service";

@Controller("api/search")
export class SearchController {
  constructor(private service: SearchService) {}

  @Get()
  async get(
    @Query("query") query?: string,
    @Query("departmentId") departmentId?: string,
    @Query("cityId") cityId?: string,
    @Query("categoryId") categoryId?: string,
    @Query("climateId") climateId?: string,
    @Query("minPrice") minPrice?: string,
    @Query("maxPrice") maxPrice?: string,
    @Query("take") take?: string,
    @Query("skip") skip?: string
  ) {
    return this.service.search({
      query,
      departmentId: departmentId ? Number(departmentId) : undefined,
      cityId: cityId ? Number(cityId) : undefined,
      categoryId: categoryId ? Number(categoryId) : undefined,
      climateId: climateId ? Number(climateId) : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      take: take ? Number(take) : undefined,
      skip: skip ? Number(skip) : undefined,
    });
  }
}
