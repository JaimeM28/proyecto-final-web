// src/service-requests/dto/reject-service-request.dto.ts

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RejectServiceRequestDto {
  @ApiPropertyOptional({
    example: 'No tengo disponibilidad para esa fecha.',
  })
  @IsOptional()
  @IsString()
  reason?: string;
}