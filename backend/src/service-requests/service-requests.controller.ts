// src/service-requests/service-requests.controller.ts

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ServiceRequestsService } from './service-requests.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { RejectServiceRequestDto } from './dto/reject-service-request.dto';
import { ServiceRequestStatus } from './enums/service-request-status.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';

@ApiTags('Service Requests')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('service-requests')
export class ServiceRequestsController {
  constructor(
    private readonly serviceRequestsService: ServiceRequestsService,
  ) {}

  @Post()
  @Roles(UserRole.CLIENT)
  @ApiOperation({
    summary: 'Crear solicitud de servicio',
  })
  @ApiResponse({
    status: 201,
    description: 'Solicitud creada correctamente.',
  })
  create(@Req() req, @Body() dto: CreateServiceRequestDto) {
    return this.serviceRequestsService.create(req.user.id, dto);
  }

  @Get('me')
  @Roles(UserRole.CLIENT, UserRole.PROVIDER)
  @ApiOperation({
    summary: 'Obtener mis solicitudes',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ServiceRequestStatus,
  })
  findMine(
    @Req() req,
    @Query('status') status?: ServiceRequestStatus,
  ) {
    return this.serviceRequestsService.findMine(
      req.user.id,
      req.user.role,
      status,
    );
  }

  @Get(':id')
  @Roles(UserRole.CLIENT, UserRole.PROVIDER)
  @ApiOperation({
    summary: 'Obtener detalle de solicitud',
  })
  @ApiParam({
    name: 'id',
    example: 'uuid-de-la-solicitud',
  })
  findOne(@Req() req, @Param('id') id: string) {
    return this.serviceRequestsService.findOne(
      req.user.id,
      req.user.role,
      id,
    );
  }

  @Patch(':id/accept')
  @Roles(UserRole.PROVIDER)
  @ApiOperation({
    summary: 'Aceptar solicitud de servicio',
  })
  accept(@Req() req, @Param('id') id: string) {
    return this.serviceRequestsService.accept(req.user.id, id);
  }

  @Patch(':id/reject')
  @Roles(UserRole.PROVIDER)
  @ApiOperation({
    summary: 'Rechazar solicitud de servicio',
  })
  reject(
    @Req() req,
    @Param('id') id: string,
    @Body() dto: RejectServiceRequestDto,
  ) {
    return this.serviceRequestsService.reject(
      req.user.id,
      id,
      dto,
    );
  }

  @Patch(':id/cancel')
  @Roles(UserRole.CLIENT)
  @ApiOperation({
    summary: 'Cancelar solicitud de servicio',
  })
  cancel(@Req() req, @Param('id') id: string) {
    return this.serviceRequestsService.cancel(req.user.id, id);
  }

  @Patch(':id/complete')
  @Roles(UserRole.PROVIDER)
  @ApiOperation({
    summary: 'Completar solicitud de servicio',
  })
  complete(@Req() req, @Param('id') id: string) {
    return this.serviceRequestsService.complete(req.user.id, id);
  }
}