"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
const path_1 = require("path");
const fs_1 = require("fs");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const prisma = app.get(prisma_service_1.PrismaService);
    prisma.enableShutdownHooks(app);
    app.enableCors({ origin: true, credentials: true });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    const uploadsPath = (0, path_1.join)(process.cwd(), 'uploads');
    if (!(0, fs_1.existsSync)(uploadsPath))
        (0, fs_1.mkdirSync)(uploadsPath, { recursive: true });
    app.useStaticAssets(uploadsPath, { prefix: '/uploads/' });
    const PORT = Number(process.env.PORT) || 3000;
    const HOST = process.env.HOST || '0.0.0.0';
    await app.listen(PORT, HOST);
    const url = await app.getUrl();
    console.log(`🚀 Backend corriendo en ${url}`);
}
bootstrap();
//# sourceMappingURL=main.js.map