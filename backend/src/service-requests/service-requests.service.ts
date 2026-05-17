// src/service-requests/service-requests.service.ts

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/enums/user-role.enum';

import { ProviderProfile } from '../providers/entities/provider-profile.entity';

import { ServiceRequest } from './entities/service-request.entity';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { RejectServiceRequestDto } from './dto/reject-service-request.dto';
import { ServiceRequestStatus } from './enums/service-request-status.enum';
import { QueuesService } from '../queues/queues.service';

@Injectable()
export class ServiceRequestsService {
  constructor(
    @InjectRepository(ServiceRequest)
    private readonly serviceRequestRepository: Repository<ServiceRequest>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(ProviderProfile)
    private readonly providerProfileRepository: Repository<ProviderProfile>,
    private readonly queuesService: QueuesService,
  ) {}

  async create(clientId: string, dto: CreateServiceRequestDto) {
    const client = await this.usersRepository.findOne({
      where: { id: clientId },
    });

    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }

    if (!client.isOnboardingCompleted) {
      throw new ForbiddenException(
        'Debes completar tu onboarding primero',
      );
    }

    const provider = await this.providerProfileRepository.findOne({
      where: { id: dto.providerId },
      relations: {
        user: true,
      },
    });

    if (!provider) {
      throw new NotFoundException('Proveedor no encontrado');
    }

    if (!provider.user.isOnboardingCompleted) {
      throw new BadRequestException(
        'El proveedor aún no tiene su perfil completo',
      );
    }

    const serviceRequest = this.serviceRequestRepository.create({
      client,
      provider,
      title: dto.title,
      description: dto.description,
      requestedDate: new Date(dto.requestedDate),
      status: ServiceRequestStatus.PENDING,
      rejectionReason: null,
    });

    const savedRequest =
      await this.serviceRequestRepository.save(serviceRequest);

    await this.queuesService.addServiceRequestCreatedJob({
        providerEmail: provider.user.email,
        providerName: provider.user.name,
        clientName: client.name,
        title: savedRequest.title,
        requestedDate: savedRequest.requestedDate,
    });

    return {
      message: 'Solicitud creada correctamente',
      serviceRequest: this.toResponse(savedRequest),
    };
  }

  async findMine(
    userId: string,
    role: UserRole,
    status?: ServiceRequestStatus,
  ) {
    const query = this.serviceRequestRepository
      .createQueryBuilder('request')
      .leftJoinAndSelect('request.client', 'client')
      .leftJoinAndSelect('request.provider', 'provider')
      .leftJoinAndSelect('provider.user', 'providerUser')
      .select([
        'request.id',
        'request.title',
        'request.description',
        'request.requestedDate',
        'request.status',
        'request.rejectionReason',
        'request.createdAt',
        'request.updatedAt',

        'client.id',
        'client.name',
        'client.email',
        'client.role',

        'provider.id',
        'provider.trade',
        'provider.location',
        'provider.description',
        'provider.price',

        'providerUser.id',
        'providerUser.name',
        'providerUser.email',
        'providerUser.role',
      ]);

    if (role === UserRole.CLIENT) {
      query.where('client.id = :userId', { userId });
    }

    if (role === UserRole.PROVIDER) {
      query.where('providerUser.id = :userId', { userId });
    }

    if (status) {
      query.andWhere('request.status = :status', { status });
    }

    const requests = await query
      .orderBy('request.createdAt', 'DESC')
      .getMany();

    return requests.map((request) => this.toResponse(request));
  }

  async findOne(userId: string, role: UserRole, id: string) {
    const request = await this.findRequestWithRelations(id);

    if (!request) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    this.validateOwnership(request, userId, role);

    return this.toResponse(request);
  }

  async accept(providerUserId: string, id: string) {
    const request = await this.findRequestWithRelations(id);

    if (!request) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    if (request.provider.user.id !== providerUserId) {
      throw new ForbiddenException(
        'No puedes aceptar una solicitud que no te pertenece',
      );
    }

    if (request.status !== ServiceRequestStatus.PENDING) {
      throw new BadRequestException(
        'Solo puedes aceptar solicitudes pendientes',
      );
    }

    request.status = ServiceRequestStatus.ACCEPTED;

    const savedRequest =
      await this.serviceRequestRepository.save(request);

    await this.queuesService.addServiceRequestAcceptedJob({
        clientEmail: request.client.email,
        clientName: request.client.name,
        providerName: request.provider.user.name,
        title: request.title,
        requestedDate: request.requestedDate,
    });

    return {
      message: 'Solicitud aceptada correctamente',
      serviceRequest: this.toResponse(savedRequest),
    };
  }

  async reject(
    providerUserId: string,
    id: string,
    dto: RejectServiceRequestDto,
  ) {
    const request = await this.findRequestWithRelations(id);

    if (!request) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    if (request.provider.user.id !== providerUserId) {
      throw new ForbiddenException(
        'No puedes rechazar una solicitud que no te pertenece',
      );
    }

    if (request.status !== ServiceRequestStatus.PENDING) {
      throw new BadRequestException(
        'Solo puedes rechazar solicitudes pendientes',
      );
    }

    request.status = ServiceRequestStatus.REJECTED;
    request.rejectionReason = dto.reason ?? null;

    const savedRequest =
      await this.serviceRequestRepository.save(request);

    await this.queuesService.addServiceRequestRejectedJob({
        clientEmail: request.client.email,
        clientName: request.client.name,
        providerName: request.provider.user.name,
        title: request.title,
        reason: dto.reason,
    });

    return {
      message: 'Solicitud rechazada correctamente',
      serviceRequest: this.toResponse(savedRequest),
    };
  }

  async cancel(clientId: string, id: string) {
    const request = await this.findRequestWithRelations(id);

    if (!request) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    if (request.client.id !== clientId) {
      throw new ForbiddenException(
        'No puedes cancelar una solicitud que no te pertenece',
      );
    }

    const allowedStatuses = [
      ServiceRequestStatus.PENDING,
      ServiceRequestStatus.ACCEPTED,
    ];

    if (!allowedStatuses.includes(request.status)) {
      throw new BadRequestException(
        'Esta solicitud ya no puede cancelarse',
      );
    }

    request.status = ServiceRequestStatus.CANCELLED;

    const savedRequest =
      await this.serviceRequestRepository.save(request);

    return {
      message: 'Solicitud cancelada correctamente',
      serviceRequest: this.toResponse(savedRequest),
    };
  }

  async complete(providerUserId: string, id: string) {
    const request = await this.findRequestWithRelations(id);

    if (!request) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    if (request.provider.user.id !== providerUserId) {
      throw new ForbiddenException(
        'No puedes completar una solicitud que no te pertenece',
      );
    }

    const allowedStatuses = [
      ServiceRequestStatus.ACCEPTED,
      ServiceRequestStatus.PAID,
    ];

    if (!allowedStatuses.includes(request.status)) {
      throw new BadRequestException(
        'Solo puedes completar solicitudes aceptadas o pagadas',
      );
    }

    request.status = ServiceRequestStatus.COMPLETED;

    const savedRequest =
      await this.serviceRequestRepository.save(request);

    return {
      message: 'Solicitud completada correctamente',
      serviceRequest: this.toResponse(savedRequest),
    };
  }

  private async findRequestWithRelations(id: string) {
    return this.serviceRequestRepository.findOne({
      where: { id },
      relations: {
        client: true,
        provider: {
          user: true,
        },
      },
    });
  }

  private validateOwnership(
    request: ServiceRequest,
    userId: string,
    role: UserRole,
  ) {
    const isClientOwner = request.client.id === userId;

    const isProviderOwner =
      request.provider.user.id === userId;

    if (role === UserRole.CLIENT && !isClientOwner) {
      throw new ForbiddenException(
        'No tienes acceso a esta solicitud',
      );
    }

    if (role === UserRole.PROVIDER && !isProviderOwner) {
      throw new ForbiddenException(
        'No tienes acceso a esta solicitud',
      );
    }
  }

  private toResponse(request: ServiceRequest) {
    return {
      id: request.id,
      title: request.title,
      description: request.description,
      requestedDate: request.requestedDate,
      status: request.status,
      rejectionReason: request.rejectionReason,
      createdAt: request.createdAt,
      updatedAt: request.updatedAt,
      client: {
        id: request.client.id,
        name: request.client.name,
        email: request.client.email,
        role: request.client.role,
      },
      provider: {
        id: request.provider.id,
        trade: request.provider.trade,
        location: request.provider.location,
        description: request.provider.description,
        price: request.provider.price,
        user: {
          id: request.provider.user.id,
          name: request.provider.user.name,
          email: request.provider.user.email,
          role: request.provider.user.role,
        },
      },
    };
  }
}