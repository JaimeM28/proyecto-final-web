// src/payments/dto/create-payment.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 'uuid-service-request' })
  @IsUUID()
  serviceRequestId: string;
}