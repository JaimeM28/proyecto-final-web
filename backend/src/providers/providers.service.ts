import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/enums/user-role.enum';
import { ProviderProfile } from './entities/provider-profile.entity';
import { ProviderOnboardingDto } from './dto/provider-onboarding.dto';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(ProviderProfile)
    private readonly providerProfileRepository: Repository<ProviderProfile>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

 async completeOnboarding(userId: string, dto: ProviderOnboardingDto) {
  const user = await this.usersRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new NotFoundException('Usuario no encontrado');
  }

  if (user.role !== UserRole.PROVIDER) {
    throw new ForbiddenException('Solo proveedores pueden completar este onboarding');
  }

  const existingProfile = await this.providerProfileRepository.findOne({
    where: {
      user: {
        id: userId,
      },
    },
  });

  if (existingProfile) {
    throw new BadRequestException('El onboarding ya fue completado');
  }

  const profile = this.providerProfileRepository.create({
    user,
    trade: dto.trade,
    location: dto.location,
    description: dto.description ?? null,
    price: dto.price ?? null,
  });

  const savedProfile = await this.providerProfileRepository.save(profile);

  user.isOnboardingCompleted = true;
  const updatedUser = await this.usersRepository.save(user);

  return {
    message: 'Onboarding de proveedor completado',
    profile: {
      id: savedProfile.id,
      trade: savedProfile.trade,
      location: savedProfile.location,
      description: savedProfile.description,
      price: savedProfile.price,
    },
    user: {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isOnboardingCompleted: updatedUser.isOnboardingCompleted,
    },
  };
}
}