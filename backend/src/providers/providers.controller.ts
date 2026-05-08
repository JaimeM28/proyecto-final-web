import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ProvidersService } from './providers.service';
import { ProviderOnboardingDto } from './dto/provider-onboarding.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Providers')
@ApiBearerAuth()
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post('onboarding')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Completar onboarding de proveedor',
  })
  @ApiResponse({
    status: 201,
    description: 'Onboarding de proveedor completado',
  })
  completeOnboarding(
    @Req() req,
    @Body() dto: ProviderOnboardingDto,
  ) {
    return this.providersService.completeOnboarding(req.user.id, dto);
  }
}