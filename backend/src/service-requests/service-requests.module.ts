// src/service-requests/service-requests.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServiceRequestsController } from './service-requests.controller';
import { ServiceRequestsService } from './service-requests.service';
import { ServiceRequest } from './entities/service-request.entity';
import { User } from '../users/entities/user.entity';
import { ProviderProfile } from '../providers/entities/provider-profile.entity';
import { QueuesModule } from '../queues/queues.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceRequest,
      User,
      ProviderProfile,
    ]),
    QueuesModule,
  ],
  controllers: [ServiceRequestsController],
  providers: [ServiceRequestsService],
})
export class ServiceRequestsModule {}