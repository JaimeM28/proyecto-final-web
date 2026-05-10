// auth/auth.service.ts
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UserRole } from '../users/enums/user-role.enum';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { QueuesService } from '../queues/queues.service';
import { randomInt } from 'crypto';
import { Throttle } from '@nestjs/throttler'; 
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly queuesService: QueuesService,
  ) {}

  async register(dto: RegisterDto) {
    const userExists = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    if (userExists) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const emailVerificationCode = randomInt(100000, 1000000).toString();

    const user = this.usersRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: dto.role,
      isOnboardingCompleted: false,
      isEmailVerified: false,
      emailVerificationCode,
      emailVerificationCodeExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });
    await this.usersRepository.save(user);
    await this.queuesService.addEmailVerificationJob(
      user.email,
      emailVerificationCode,
  );
    return {
      message: 'Usuario registrado correctamente',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async login(dto: LoginDto) {
  const user = await this.usersRepository.findOne({
    where: { email: dto.email },
  });

  if (!user) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  const passwordIsValid = await bcrypt.compare(dto.password, user.password);

  if (!passwordIsValid) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  if (!user.isEmailVerified) {
    throw new UnauthorizedException(
      'Debes verificar tu correo antes de iniciar sesión',
    );
}

  const token = await this.jwtService.signAsync({
    sub: user.id,
    email: user.email,
    role: user.role,
    isOnboardingCompleted: user.isOnboardingCompleted,
  });

  return {
    accessToken: token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isOnboardingCompleted: user.isOnboardingCompleted,
    },
  };
}

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      return {
        message: 'Si el correo existe, se enviará un código de recuperación',
      };
    }

    const code = randomInt(100000, 1000000).toString();

    user.resetCode = code;
    user.resetCodeExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await this.usersRepository.save(user);

    await this.queuesService.addPasswordResetJob(user.email, code);

    return {
      message: 'Si el correo existe, se enviará un código de recuperación',
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    if (!user || !user.resetCode || !user.resetCodeExpiresAt) {
      throw new BadRequestException('Código inválido');
    }

    const codeExpired = user.resetCodeExpiresAt.getTime() < Date.now();

    if (codeExpired || user.resetCode !== dto.code) {
      throw new BadRequestException('Código inválido o expirado');
    }

    user.password = await bcrypt.hash(dto.newPassword, 10);
    user.resetCode = null;
    user.resetCodeExpiresAt = null;

    await this.usersRepository.save(user);

    return {
      message: 'Contraseña actualizada correctamentee',
    };
  }

  async verifyEmail(dto: VerifyEmailDto) {
  const user = await this.usersRepository.findOne({
    where: { email: dto.email },
  });

  if (!user) {
    throw new BadRequestException('Código inválido');
  }

  if (user.isEmailVerified) {
    return {
      message: 'El correo ya está verificado',
    };
  }

  if (
    !user.emailVerificationCode ||
    !user.emailVerificationCodeExpiresAt
  ) {
    throw new BadRequestException('Código inválido');
  }

  const codeExpired =
    user.emailVerificationCodeExpiresAt.getTime() < Date.now();

  if (codeExpired || user.emailVerificationCode !== dto.code) {
    throw new BadRequestException('Código inválido o expirado');
  }

  user.isEmailVerified = true;
  user.emailVerificationCode = null;
  user.emailVerificationCodeExpiresAt = null;

  await this.usersRepository.save(user);

  return {
    message: 'Correo verificado correctamente',
  };
}
}