// src/queues/processors/mail.processor.ts

import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

import { MailService } from '../../mail/mail.service';
import { MAIL_QUEUE, MailJob } from '../queues.constants';

@Processor(MAIL_QUEUE)
export class MailProcessor extends WorkerHost {
  private readonly logger = new Logger(MailProcessor.name);

  constructor(private readonly mailService: MailService) {
    super();
  }

  async process(job: Job<{ email: string; code: string }>) {
    const { email, code } = job.data;

    switch (job.name) {
      case MailJob.EMAIL_VERIFICATION:
        await this.mailService.sendEmailVerificationCode(email, code);
        return;

      case MailJob.PASSWORD_RESET:
        await this.mailService.sendPasswordResetCode(email, code);
        return;

      default:
        this.logger.warn(`Job no soportado: ${job.name}`);
        return;
    }
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    this.logger.log(`Job completado: ${job.name} - ${job.id}`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    this.logger.error(`Job falló: ${job.name} - ${job.id}`, error.stack);
  }
}