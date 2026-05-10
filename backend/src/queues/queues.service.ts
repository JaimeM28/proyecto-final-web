// src/queues/queues.service.ts

import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

import { MAIL_QUEUE, MailJob } from './queues.constants';

@Injectable()
export class QueuesService {
  constructor(
    @InjectQueue(MAIL_QUEUE)
    private readonly mailQueue: Queue,
  ) {}

  async addEmailVerificationJob(email: string, code: string) {
    return this.mailQueue.add(
      MailJob.EMAIL_VERIFICATION,
      { email, code },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 3000,
        },
        removeOnComplete: 100,
        removeOnFail: 1000,
      },
    );
  }

  async addPasswordResetJob(email: string, code: string) {
    return this.mailQueue.add(
      MailJob.PASSWORD_RESET,
      { email, code },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 3000,
        },
        removeOnComplete: 100,
        removeOnFail: 1000,
      },
    );
  }
}