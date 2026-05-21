// src/availability/availability.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Appointment } from '../appointments/entities/appointment.entity';
import { AppointmentStatus } from '../appointments/enums/appointment-status.enum';

import { ServiceRequest } from '../service-requests/entities/service-request.entity';
import { ServiceRequestStatus } from '../service-requests/enums/service-request-status.enum';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,

    @InjectRepository(ServiceRequest)
    private readonly serviceRequestRepository: Repository<ServiceRequest>,
  ) {}

  async hasProviderConflict(
    providerId: string,
    requestedDate: Date,
    ignoreServiceRequestId?: string,
  ): Promise<boolean> {
    const appointmentConflict =
      await this.appointmentRepository.findOne({
        where: {
          provider: {
            id: providerId,
          },
          date: requestedDate,
          status: AppointmentStatus.SCHEDULED,
        },
      });

    if (appointmentConflict) {
      return true;
    }

    const requestQuery = this.serviceRequestRepository
      .createQueryBuilder('request')
      .leftJoin('request.provider', 'provider')
      .where('provider.id = :providerId', { providerId })
      .andWhere('request.requestedDate = :requestedDate', {
        requestedDate,
      })
      .andWhere('request.status IN (:...statuses)', {
        statuses: [
          ServiceRequestStatus.ACCEPTED,
          ServiceRequestStatus.PAID,
        ],
      });

    if (ignoreServiceRequestId) {
      requestQuery.andWhere('request.id != :ignoreServiceRequestId', {
        ignoreServiceRequestId,
      });
    }

    const requestConflict = await requestQuery.getOne();

    return !!requestConflict;
  }
}