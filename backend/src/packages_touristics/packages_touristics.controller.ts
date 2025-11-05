import { Controller } from '@nestjs/common';
import { PackagesTouristicsService } from './packages_touristics.service';

@Controller('packages-touristics')
export class PackagesTouristicsController {
  constructor(private readonly service: PackagesTouristicsService) {}

  // ... tus endpoints reales (POST/GET/etc.)
}
