// src/clients/dto/client-onboarding.dto.ts

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ClientOnboardingDto {
  @ApiProperty({ example: 'Ciudad de México' })
  @IsNotEmpty()
  location: string;

  
}