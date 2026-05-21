// src/queues/queues.module.ts

import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { QueuesService } from './queues.service';
import { MailProcessor } from './processors/mail.processor';
import { MailModule } from '../mail/mail.module';
import { MAIL_QUEUE, SERVICE_REQUEST_QUEUE } from './queues.constants';
import { Payment } from '../payments/entities/payment.entity';
import { ServiceRequest } from '../service-requests/entities/service-request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRequestProcessor } from './processors/service-request.processor';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'redis',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    }),
    BullModule.registerQueue(
      {name: MAIL_QUEUE},
      {name: SERVICE_REQUEST_QUEUE},
    ),
    TypeOrmModule.forFeature([
      ServiceRequest,
      Payment,
    ]),
     MailModule,
  ],
  providers: [QueuesService, MailProcessor, ServiceRequestProcessor],
  exports: [QueuesService],
})
export class QueuesModule {}
