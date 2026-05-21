// src/queues/processors/service-request.processor.ts

import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bullmq';
import { Repository } from 'typeorm';

import {
  SERVICE_REQUEST_QUEUE,
  ServiceRequestJob,
} from '../queues.constants';

import { ServiceRequest } from '../../service-requests/entities/service-request.entity';
import { ServiceRequestStatus } from '../../service-requests/enums/service-request-status.enum';

@Processor(SERVICE_REQUEST_QUEUE)
export class ServiceRequestProcessor extends WorkerHost {
  private readonly logger = new Logger(ServiceRequestProcessor.name);

  constructor(
    @InjectRepository(ServiceRequest)
    private readonly serviceRequestRepository: Repository<ServiceRequest>,
  ) {
    super();
  }

  async process(job: Job<{ serviceRequestId: string }>) {
    if (job.name !== ServiceRequestJob.CANCEL_EXPIRED) {
      this.logger.warn(`Job no soportado: ${job.name}`);
      return;
    }

    const serviceRequest = await this.serviceRequestRepository.findOne({
      where: {
        id: job.data.serviceRequestId,
      },
    });

    if (!serviceRequest) {
      return;
    }

    if (serviceRequest.status !== ServiceRequestStatus.PENDING) {
      return;
    }

    serviceRequest.status = ServiceRequestStatus.CANCELLED;
    serviceRequest.rejectionReason =
      'La solicitud expiró porque la fecha ya pasó';

    await this.serviceRequestRepository.save(serviceRequest);
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