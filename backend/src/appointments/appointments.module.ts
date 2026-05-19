// backend/src/appointments/appointments.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';

import { Appointment } from './entities/appointment.entity';
import { ServiceRequest } from '../service-requests/entities/service-request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      ServiceRequest,
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}