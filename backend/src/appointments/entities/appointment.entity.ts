// backend/src/appointments/entities/appointment.entity.ts

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { ProviderProfile } from '../../providers/entities/provider-profile.entity';
import { ServiceRequest } from '../../service-requests/entities/service-request.entity';
import { AppointmentStatus } from '../enums/appointment-status.enum';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  client: User;

  @ManyToOne(() => ProviderProfile)
  provider: ProviderProfile;

  @OneToOne(() => ServiceRequest)
  @JoinColumn()
  serviceRequest: ServiceRequest;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.SCHEDULED,
  })
  status: AppointmentStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}