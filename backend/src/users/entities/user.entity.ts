import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserRole } from '../enums/user-role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @Column({
    type: 'boolean',
    default: false,
  })
  isOnboardingCompleted: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  resetCode: string | null;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  resetCodeExpiresAt: Date | null;
}