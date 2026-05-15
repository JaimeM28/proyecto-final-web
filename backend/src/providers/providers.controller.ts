import {
  Body,
  Controller,
  Get,
  Param,
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

import { ProvidersService } from './providers.service';
import { ProviderOnboardingDto } from './dto/provider-onboarding.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../users/enums/user-role.enum';

@ApiTags('Providers')
@ApiBearerAuth()
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post('onboarding')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROVIDER)
  @ApiOperation({
    summary: 'Completar onboarding de proveedor',
  })
  @ApiResponse({
    status: 201,
    description: 'Onboarding de proveedor completado',
  })
  completeOnboarding(@Req() req, @Body() dto: ProviderOnboardingDto) {
    return this.providersService.completeOnboarding(req.user.id, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Buscar proveedores',
    description: 'Permite buscar proveedores por oficio y ubicación.',
  })
  @ApiQuery({
    name: 'trade',
    required: false,
    example: 'Plomero',
    description: 'Filtrar proveedores por oficio',
  })
  @ApiQuery({
    name: 'location',
    required: false,
    example: 'Monterrey',
    description: 'Filtrar proveedores por ubicación',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de proveedores obtenida correctamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  findAll(
    @Query('trade') trade?: string,
    @Query('location') location?: string,
  ) {
    return this.providersService.findAll({
      trade,
      location,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener detalle de proveedor',
    description: 'Obtiene la información completa de un proveedor por su ID.',
  })
  @ApiParam({
    name: 'id',
    example: '9f1f5405-fa2a-434c-aaf8-8ded8c43a9df',
    description: 'ID del perfil del proveedor',
  })
  @ApiResponse({
    status: 200,
    description: 'Proveedor obtenido correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Proveedor no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  findOne(@Param('id') id: string) {
    return this.providersService.findOne(id);
  }
}
