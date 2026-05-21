// backend/src/appointments/appointments.service.ts

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Appointment } from './entities/appointment.entity';
import { AppointmentStatus } from './enums/appointment-status.enum';

import { ServiceRequest } from '../service-requests/entities/service-request.entity';
import { ServiceRequestStatus } from '../service-requests/enums/service-request-status.enum';
import { UserRole } from '../users/enums/user-role.enum';
import { AvailabilityService } from '../availability/availability.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,

    @InjectRepository(ServiceRequest)
    private readonly serviceRequestRepository: Repository<ServiceRequest>,
    private readonly availabilityService: AvailabilityService,
  ) {}

  async createFromServiceRequest(serviceRequestId: string) {
    const serviceRequest = await this.serviceRequestRepository.findOne({
      where: { id: serviceRequestId },
      relations: {
        client: true,
        provider: {
          user: true,
        },
      },
    });

    if (!serviceRequest) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    if (serviceRequest.status !== ServiceRequestStatus.PAID) {
      throw new BadRequestException(
        'Solo se puede crear una cita para solicitudes pagadas',
      );
    }

    const existingAppointment = await this.appointmentRepository.findOne({
      where: {
        serviceRequest: {
          id: serviceRequest.id,
        },
      },
    });

    if (existingAppointment) {
      return existingAppointment;
    }

     const hasConflict =
      await this.availabilityService.hasProviderConflict(
        serviceRequest.provider.id,
        serviceRequest.requestedDate,
        serviceRequest.id,
      );

    if (hasConflict) {
      throw new BadRequestException(
        'El proveedor ya tiene una cita programada en ese horario',
      );
    }


    const appointment = this.appointmentRepository.create({
      client: serviceRequest.client,
      provider: serviceRequest.provider,
      serviceRequest,
      date: serviceRequest.requestedDate,
      status: AppointmentStatus.SCHEDULED,
    });

    return this.appointmentRepository.save(appointment);
  }

  async findMine(
    userId: string,
    role: UserRole,
    status?: AppointmentStatus,
  ) {
    const query = this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.client', 'client')
      .leftJoinAndSelect('appointment.provider', 'provider')
      .leftJoinAndSelect('provider.user', 'providerUser')
      .leftJoinAndSelect('appointment.serviceRequest', 'serviceRequest')
      .select([
        'appointment.id',
        'appointment.date',
        'appointment.status',
        'appointment.createdAt',
        'appointment.updatedAt',

        'client.id',
        'client.name',
        'client.email',
        'client.role',

        'provider.id',
        'provider.trade',
        'provider.location',
        'provider.price',

        'providerUser.id',
        'providerUser.name',
        'providerUser.email',
        'providerUser.role',

        'serviceRequest.id',
        'serviceRequest.title',
        'serviceRequest.description',
        'serviceRequest.status',
      ]);

    if (role === UserRole.CLIENT) {
      query.where('client.id = :userId', { userId });
    }

    if (role === UserRole.PROVIDER) {
      query.where('providerUser.id = :userId', { userId });
    }

    if (status) {
      query.andWhere('appointment.status = :status', { status });
    }

    const appointments = await query
      .orderBy('appointment.date', 'ASC')
      .getMany();

    return appointments.map((appointment) => this.toResponse(appointment));
  }

  async findOne(userId: string, role: UserRole, id: string) {
    const appointment = await this.findOneWithRelations(id);

    if (!appointment) {
      throw new NotFoundException('Cita no encontrada');
    }

    this.validateOwnership(appointment, userId, role);

    return this.toResponse(appointment);
  }

  
  async cancel(userId: string, role: UserRole, id: string) {
    const appointment = await this.findOneWithRelations(id);

    if (!appointment) {
      throw new NotFoundException('Cita no encontrada');
    }

    this.validateOwnership(appointment, userId, role);

    if (appointment.status !== AppointmentStatus.SCHEDULED) {
      throw new BadRequestException(
        'Solo puedes cancelar citas programadas',
      );
    }

    appointment.status = AppointmentStatus.CANCELLED;
    appointment.serviceRequest.status = ServiceRequestStatus.CANCELLED;

    await this.serviceRequestRepository.save(appointment.serviceRequest);

    const savedAppointment =
      await this.appointmentRepository.save(appointment);

    return {
      message:
        'Cita cancelada correctamente. El reembolso está siendo procesado.',
      appointment: this.toResponse(savedAppointment),
    };
  }

  async complete(userId: string, role: UserRole, id: string) {
    const appointment = await this.findOneWithRelations(id);

    if (!appointment) {
      throw new NotFoundException('Cita no encontrada');
    }

    if (role !== UserRole.PROVIDER) {
      throw new ForbiddenException(
        'Solo el proveedor puede completar una cita',
      );
    }

    if (appointment.provider.user.id !== userId) {
      throw new ForbiddenException(
        'No puedes completar una cita que no te pertenece',
      );
    }

    if (appointment.status !== AppointmentStatus.SCHEDULED) {
      throw new BadRequestException(
        'Solo puedes completar citas programadas',
      );
    }

    appointment.status = AppointmentStatus.COMPLETED;
    appointment.serviceRequest.status = ServiceRequestStatus.COMPLETED;

    await this.serviceRequestRepository.save(appointment.serviceRequest);

    const savedAppointment = await this.appointmentRepository.save(appointment);

    return {
      message: 'Cita completada correctamente',
      appointment: this.toResponse(savedAppointment),
    };
  }

  private async findOneWithRelations(id: string) {
    return this.appointmentRepository.findOne({
      where: { id },
      relations: {
        client: true,
        provider: {
          user: true,
        },
        serviceRequest: true,
      },
    });
  }

  private validateOwnership(
    appointment: Appointment,
    userId: string,
    role: UserRole,
  ) {
    const isClientOwner = appointment.client.id === userId;
    const isProviderOwner = appointment.provider.user.id === userId;

    if (role === UserRole.CLIENT && !isClientOwner) {
      throw new ForbiddenException('No tienes acceso a esta cita');
    }

    if (role === UserRole.PROVIDER && !isProviderOwner) {
      throw new ForbiddenException('No tienes acceso a esta cita');
    }
  }

  private toResponse(appointment: Appointment) {
    return {
      id: appointment.id,
      date: appointment.date,
      status: appointment.status,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
      client: {
        id: appointment.client.id,
        name: appointment.client.name,
        email: appointment.client.email,
        role: appointment.client.role,
      },
      provider: {
        id: appointment.provider.id,
        trade: appointment.provider.trade,
        location: appointment.provider.location,
        price: Number(appointment.provider.price),
        user: {
          id: appointment.provider.user.id,
          name: appointment.provider.user.name,
          email: appointment.provider.user.email,
          role: appointment.provider.user.role,
        },
      },
      serviceRequest: {
        id: appointment.serviceRequest.id,
        title: appointment.serviceRequest.title,
        description: appointment.serviceRequest.description,
        status: appointment.serviceRequest.status,
      },
    };
  }
}