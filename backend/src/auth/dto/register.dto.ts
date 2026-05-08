import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { UserRole } from '../../users/enums/user-role.enum';

export class RegisterDto {
  @ApiProperty({
    example: 'Juan Pérez',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.PROVIDER,
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    example: 'juan@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password123',
    minLength: 8,
  })
  @MinLength(8)
  password: string;
}