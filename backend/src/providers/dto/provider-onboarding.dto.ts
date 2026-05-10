// src/providers/dto/provider-onboarding.dto.ts

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class ProviderOnboardingDto {
  @ApiProperty({ example: 'Plomero' })
  @IsNotEmpty()
  trade: string;

  @ApiProperty({ example: 'Monterrey' })
  @IsNotEmpty()
  location: string;

  @ApiPropertyOptional({ example: 'Especialista en fugas y tuberías' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 500 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
