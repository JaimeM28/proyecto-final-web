// src/providers/entities/provider-profile.entity.ts

import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('provider_profiles')
export class ProviderProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ type: 'varchar' })
  trade: string;

  @Column({ type: 'varchar' })
  location: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'decimal', nullable: true })
  price: number | null;
}