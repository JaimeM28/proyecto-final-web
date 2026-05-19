// backend/src/appointments/appointments.controller.ts

import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { AppointmentsService } from './appointments.service';
import { AppointmentStatus } from './enums/appointment-status.enum';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';

@ApiTags('Appointments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
  ) {}

  @Get('me')
  @Roles(UserRole.CLIENT, UserRole.PROVIDER)
  @ApiOperation({
    summary: 'Obtener mis citas',
    description:
      'Obtiene las citas del usuario autenticado. Si es cliente, devuelve sus citas como cliente. Si es proveedor, devuelve las citas asociadas a su perfil.',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: AppointmentStatus,
  })
  findMine(
    @Req() req,
    @Query('status') status?: AppointmentStatus,
  ) {
    return this.appointmentsService.findMine(
      req.user.id,
      req.user.role,
      status,
    );
  }

  @Get(':id')
  @Roles(UserRole.CLIENT, UserRole.PROVIDER)
  @ApiOperation({
    summary: 'Obtener detalle de cita',
  })
  @ApiParam({
    name: 'id',
    example: 'uuid-de-la-cita',
  })
  findOne(@Req() req, @Param('id') id: string) {
    return this.appointmentsService.findOne(
      req.user.id,
      req.user.role,
      id,
    );
  }

  @Patch(':id/cancel')
  @Roles(UserRole.CLIENT, UserRole.PROVIDER)
  @ApiOperation({
    summary: 'Cancelar cita',
  })
  cancel(@Req() req, @Param('id') id: string) {
    return this.appointmentsService.cancel(
      req.user.id,
      req.user.role,
      id,
    );
  }

  @Patch(':id/complete')
  @Roles(UserRole.PROVIDER)
  @ApiOperation({
    summary: 'Completar cita',
    description:
      'Marca la cita como completada y también marca la solicitud de servicio como completed.',
  })
  complete(@Req() req, @Param('id') id: string) {
    return this.appointmentsService.complete(
      req.user.id,
      req.user.role,
      id,
    );
  }
}