import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MinLength,
  ValidateIf,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

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

  @ApiPropertyOptional({
    example: 'Plomero',
  })
  @ValidateIf((dto) => dto.role === UserRole.PROVIDER)
  @IsNotEmpty()
  trade?: string;

  @ApiProperty({
    example: 'Monterrey',
  })
  @IsNotEmpty()
  location: string;

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