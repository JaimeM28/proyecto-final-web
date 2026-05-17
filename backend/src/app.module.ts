import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProvidersModule } from './providers/providers.module';
import { ClientsModule } from './clients/clients.module';
import { MailModule } from './mail/mail.module';
import { QueuesModule } from './queues/queues.module';
import { ThrottlerModule } from '@nestjs/throttler/dist/throttler.module';
import { APP_GUARD } from '@nestjs/core/constants';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
import { ServiceRequestsModule } from './service-requests/service-requests.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProvidersModule,
    ClientsModule,
    MailModule,
    QueuesModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ServiceRequestsModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
