// src/queues/queues.module.ts

import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { QueuesService } from './queues.service';
import { MailProcessor } from './processors/mail.processor';
import { MailModule } from '../mail/mail.module';
import { MAIL_QUEUE } from './queues.constants';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'redis',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    }),
    BullModule.registerQueue({
      name: MAIL_QUEUE,
    }),
    MailModule,
  ],
  providers: [QueuesService, MailProcessor],
  exports: [QueuesService],
})
export class QueuesModule {}
