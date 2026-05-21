// src/queues/queues.service.ts

import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

import { 
  MAIL_QUEUE, 
  MailJob, 
  SERVICE_REQUEST_QUEUE, 
  ServiceRequestJob 
} from './queues.constants';

@Injectable()
export class QueuesService {
  constructor(
    @InjectQueue(MAIL_QUEUE)
    private readonly mailQueue: Queue,

    @InjectQueue(SERVICE_REQUEST_QUEUE)
  private readonly serviceRequestQueue: Queue,
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
        removeOnFail: 20,
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

  async addServiceRequestCreatedJob(data: {
    providerEmail: string;
    providerName: string;
    clientName: string;
    title: string;
    requestedDate: Date;
  }) {
    return this.mailQueue.add(
      MailJob.SERVICE_REQUEST_CREATED,
      data,
      {
        attempts: 3,
        backoff: { type: 'exponential', delay: 3000 },
        removeOnComplete: 100,
        removeOnFail: 20,
      },
    );
  }

  async addServiceRequestAcceptedJob(data: {
    clientEmail: string;
    clientName: string;
    providerName: string;
    title: string;
    requestedDate: Date;
  }) {
    return this.mailQueue.add(
      MailJob.SERVICE_REQUEST_ACCEPTED,
      data,
      {
        attempts: 3,
        backoff: { type: 'exponential', delay: 3000 },
        removeOnComplete: 100,
        removeOnFail: 20,
      },
    );
  }

  async addServiceRequestRejectedJob(data: {
    clientEmail: string;
    clientName: string;
    providerName: string;
    title: string;
    reason?: string;
  }) {
    return this.mailQueue.add(
      MailJob.SERVICE_REQUEST_REJECTED,
      data,
      {
        attempts: 3,
        backoff: { type: 'exponential', delay: 3000 },
        removeOnComplete: 100,
        removeOnFail: 1000,
      },
    );
  }


  async addServiceRequestExpirationJob(
    serviceRequestId: string,
    requestedDate: Date,
  ) {
    const delay = requestedDate.getTime() - Date.now();

    if (delay <= 0) {
      return;
    }

    return this.serviceRequestQueue.add(
      ServiceRequestJob.CANCEL_EXPIRED,
      { serviceRequestId },
      {
        delay,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 3000,
        },
        removeOnComplete: true,
        removeOnFail: 20,
      },
    );
  }

}
