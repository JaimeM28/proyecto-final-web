// src/service-requests/entities/service-request.entity.ts

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { ProviderProfile } from '../../providers/entities/provider-profile.entity';
import { ServiceRequestStatus } from '../enums/service-request-status.enum';

@Entity('service_requests')
export class ServiceRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  client: User;

  @ManyToOne(() => ProviderProfile)
  provider: ProviderProfile;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp' })
  requestedDate: Date;

  @Column({
    type: 'enum',
    enum: ServiceRequestStatus,
    default: ServiceRequestStatus.PENDING,
  })
  status: ServiceRequestStatus;

  @Column({ type: 'text', nullable: true })
  rejectionReason: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}