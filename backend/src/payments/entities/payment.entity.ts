// src/payments/entities/payment.entity.ts

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { ServiceRequest } from '../../service-requests/entities/service-request.entity';
import { PaymentStatus } from '../enums/payment-status.enum';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  client: User;

  @ManyToOne(() => ServiceRequest)
  serviceRequest: ServiceRequest;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Column({ type: 'varchar', nullable: true })
  mercadoPagoPreferenceId: string | null;

  @Column({ type: 'varchar', nullable: true })
  mercadoPagoPaymentId: string | null;

  @Column({ type: 'varchar', nullable: true })
  checkoutUrl: string | null;

  @CreateDateColumn()
  createdAt: Date;
}