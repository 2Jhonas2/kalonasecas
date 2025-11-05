import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';

import { PrismaModule } from './prisma/prisma.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ActivitiesModule } from './activities/activities.module';
import { PackagesActivitiesModule } from './packages_activities/packages_activities.module';
import { PlacesRecreationalsModule } from './places_recreationals/places_recreationals.module';
import { PackagesTouristicsModule } from './packages_touristics/packages_touristics.module';
import { PaymentsModule } from './payments/payments.module';
import { TypesDocumentsModule } from './types_documents/types_documents.module';
import { UsersModule } from './users/users.module';
import { RolesUsersModule } from './roles_users/roles_users.module';
import { AdminsPlacesModule } from './admins_places/admins_places.module';
import { ReservedStatesModule } from './reserved_states/reserved_states.module';
import { AuthModule } from './auth/auth.module';
import { ClimatesModule } from './climates/climates.module';
import { SearchModule } from './search/search.module';
import { CatalogModule } from './catalog/catalog.module';
import { LocationsModule } from './locations/locations.module';
import { NewsModule } from './news/news.module';

import { FavoritesModule } from './favorites/favorites.module'; // ⬅⬅⬅ AÑADIR

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const host = config.get<string>('SMTP_HOST');
        const port = Number(config.get<string>('SMTP_PORT'));
        const user = config.get<string>('SMTP_USERNAME') ?? config.get<string>('SMTP_USER');
        const pass = config.get<string>('SMTP_PASSWORD') ?? config.get<string>('SMTP_PASS');
        const senderName = config.get<string>('SENDER_NAME');
        const senderEmail = config.get<string>('SENDER_EMAIL');
        const mailFrom =
          config.get<string>('MAIL_FROM') ??
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
      inject: [ConfigService],
    }),

    // 🔌 Feature modules
    AuthModule,
    PrismaModule,
    ReservationsModule,
    ActivitiesModule,
    PackagesActivitiesModule,
    PlacesRecreationalsModule,
    PackagesTouristicsModule,
    PaymentsModule,
    TypesDocumentsModule,
    UsersModule,
    RolesUsersModule,
    AdminsPlacesModule,
    ReservedStatesModule,
    ClimatesModule,
    SearchModule,
    CatalogModule,
    LocationsModule,
    NewsModule,

    FavoritesModule, // ⬅⬅⬅ AÑADIR AQUÍ
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}