// src/availability/availability.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AvailabilityService } from './availability.service';
import { Appointment } from '../appointments/entities/appointment.entity';
import { ServiceRequest } from '../service-requests/entities/service-request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      ServiceRequest,
    ]),
  ],
  providers: [AvailabilityService],
  exports: [AvailabilityService],
})
export class AvailabilityModule {}