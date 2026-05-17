// src/service-requests/dto/create-service-request.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateServiceRequestDto {
  @ApiProperty({
    example: '9f1f5405-fa2a-434c-aaf8-8ded8c43a9df',
  })
  @IsUUID()
  providerId: string;

  @ApiProperty({
    example: 'Reparación de fuga',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Tengo una fuga en la cocina y necesito revisión.',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '2026-05-20T10:00:00.000Z',
  })
  @IsDateString()
  requestedDate: string;
}