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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const userExists = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    if (userExists) {
      throw new BadRequestException('El correo ya está registrado');
    }

    if (dto.role === UserRole.PROVIDER && !dto.trade) {
      throw new BadRequestException('El oficio es obligatorio para proveedores');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user: User = this.usersRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      location: dto.location,
      trade: dto.role === UserRole.PROVIDER ? dto.trade! : null,
      role: dto.role,
  });
    await this.usersRepository.save(user);

    return {
      message: 'Usuario registrado correctamente',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        trade: user.trade,
        location: user.location,
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

    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
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

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetCode = code;
    user.resetCodeExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await this.usersRepository.save(user);

    // Aquí debes conectar tu servicio real de correo.
    // await this.mailService.sendPasswordResetCode(user.email, code);

    console.log(`Código de recuperación para ${user.email}: ${code}`);

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
      message: 'Contraseña actualizada correctamente',
    };
  }
}