import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ClientsService } from './clients.service';
import { ClientOnboardingDto } from './dto/client-onboarding.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Clients')
@ApiBearerAuth()
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('onboarding')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Completar onboarding de cliente',
  })
  @ApiResponse({
    status: 201,
    description: 'Onboarding de cliente completado',
  })
  completeOnboarding(@Req() req, @Body() dto: ClientOnboardingDto) {
    return this.clientsService.completeOnboarding(req.user.id, dto);
  }
}
