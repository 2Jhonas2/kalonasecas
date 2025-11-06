"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const app_controller_1 = require("./app.controller");
const prisma_module_1 = require("./prisma/prisma.module");
const reservations_module_1 = require("./reservations/reservations.module");
const activities_module_1 = require("./activities/activities.module");
const packages_activities_module_1 = require("./packages_activities/packages_activities.module");
const places_recreationals_module_1 = require("./places_recreationals/places_recreationals.module");
const packages_touristics_module_1 = require("./packages_touristics/packages_touristics.module");
const payments_module_1 = require("./payments/payments.module");
const types_documents_module_1 = require("./types_documents/types_documents.module");
const users_module_1 = require("./users/users.module");
const roles_users_module_1 = require("./roles_users/roles_users.module");
const admins_places_module_1 = require("./admins_places/admins_places.module");
const reserved_states_module_1 = require("./reserved_states/reserved_states.module");
const auth_module_1 = require("./auth/auth.module");
const climates_module_1 = require("./climates/climates.module");
const search_module_1 = require("./search/search.module");
const catalog_module_1 = require("./catalog/catalog.module");
const locations_module_1 = require("./locations/locations.module");
const news_module_1 = require("./news/news.module");
const favorites_module_1 = require("./favorites/favorites.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (config) => {
                    const host = config.get('SMTP_HOST');
                    const port = Number(config.get('SMTP_PORT'));
                    const user = config.get('SMTP_USERNAME') ?? config.get('SMTP_USER');
                    const pass = config.get('SMTP_PASSWORD') ?? config.get('SMTP_PASS');
                    const senderName = config.get('SENDER_NAME');
                    const senderEmail = config.get('SENDER_EMAIL');
                    const mailFrom = config.get('MAIL_FROM') ??
                        (senderName && senderEmail ? `"${senderName}" <${senderEmail}>` : undefined);
                    const hasSmtp = !!host && !!port && !!user && !!pass;
                    return hasSmtp
                        ? {
                            transport: { host, port, secure: port === 465, auth: { user, pass }, tls: { rejectUnauthorized: false } },
                            defaults: { from: mailFrom },
                        }
                        : {
                            transport: { jsonTransport: true },
                            defaults: { from: mailFrom ?? '"Kalon Itinere" <no-reply@kalon-itinere.local>' },
                        };
                },
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            prisma_module_1.PrismaModule,
            reservations_module_1.ReservationsModule,
            activities_module_1.ActivitiesModule,
            packages_activities_module_1.PackagesActivitiesModule,
            places_recreationals_module_1.PlacesRecreationalsModule,
            packages_touristics_module_1.PackagesTouristicsModule,
            payments_module_1.PaymentsModule,
            types_documents_module_1.TypesDocumentsModule,
            users_module_1.UsersModule,
            roles_users_module_1.RolesUsersModule,
            admins_places_module_1.AdminsPlacesModule,
            reserved_states_module_1.ReservedStatesModule,
            climates_module_1.ClimatesModule,
            search_module_1.SearchModule,
            catalog_module_1.CatalogModule,
            locations_module_1.LocationsModule,
            news_module_1.NewsModule,
            favorites_module_1.FavoritesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map