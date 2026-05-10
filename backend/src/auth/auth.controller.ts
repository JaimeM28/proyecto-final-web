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
import { Throttle } from '@nestjs/throttler';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ResendVerificationEmailDto } from './dto/resend-verification-email.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Registrar usuario',
    description:
      'Registra un cliente o proveedor. Si el correo ya existe pero no está verificado, reenvía el código de verificación.',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado correctamente o código de verificación reenviado.',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o correo ya registrado y verificado.',
  })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  @ApiOperation({
    summary: 'Iniciar sesión',
    description:
      'Autentica al usuario y retorna accessToken, refreshToken y datos básicos del usuario.',
  })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas o correo no verificado.',
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('forgot-password')
  @ApiOperation({
    summary: 'Solicitar recuperación de contraseña',
    description:
      'Genera un código de recuperación y lo envía por correo. Si ya existe un código activo, no genera otro hasta que expire.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Solicitud procesada. La respuesta no revela si el correo existe.',
  })
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  @ApiOperation({
    summary: 'Restablecer contraseña',
    description:
      'Permite actualizar la contraseña usando el código recibido por correo.',
  })
  @ApiResponse({
    status: 200,
    description: 'Contraseña actualizada correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Código inválido, expirado o datos inválidos.',
  })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Post('verify-email')
  @ApiOperation({
    summary: 'Verificar correo electrónico',
    description:
      'Verifica el correo del usuario usando el código enviado durante el registro.',
  })
  @ApiResponse({
    status: 200,
    description: 'Correo verificado correctamente o ya estaba verificado.',
  })
  @ApiResponse({
    status: 400,
    description: 'Código inválido o expirado.',
  })
  verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto);
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Renovar tokens',
    description:
      'Recibe un refreshToken válido y retorna un nuevo accessToken y refreshToken.',
  })
  @ApiResponse({
    status: 200,
    description: 'Tokens renovados correctamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'Refresh token inválido o expirado.',
  })
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto.refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Cerrar sesión',
    description:
      'Elimina el refreshToken almacenado del usuario autenticado. Requiere accessToken válido.',
  })
  @ApiResponse({
    status: 200,
    description: 'Sesión cerrada correctamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado o accessToken inválido.',
  })
  logout(@Req() req) {
    return this.authService.logout(req.user.id);
  }

  @Post('resend-verification-email')
  @ApiOperation({
    summary: 'Reenviar código de verificación',
    description:
      'Reenvía un código de verificación si no hay uno activo. Si ya existe uno vigente, retorna el tiempo restante.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Solicitud procesada. Puede generar un código nuevo o informar que ya existe uno activo.',
  })
  resendVerificationEmail(@Body() dto: ResendVerificationEmailDto) {
    return this.authService.resendVerificationEmail(dto.email);
  }
}