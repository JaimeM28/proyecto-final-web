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
import { ClientProfile } from './entities/client-profile.entity';
import { ClientOnboardingDto } from './dto/client-onboarding.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientProfile)
    private readonly clientProfileRepository: Repository<ClientProfile>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async completeOnboarding(userId: string, dto: ClientOnboardingDto) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (user.role !== UserRole.CLIENT) {
      throw new ForbiddenException('Solo clientes pueden completar este onboarding');
    }

    const existingProfile = await this.clientProfileRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (existingProfile) {
      throw new BadRequestException('El onboarding ya fue completado');
    }

    const profile = this.clientProfileRepository.create({
      user,
      location: dto.location,
    });

    const savedProfile = await this.clientProfileRepository.save(profile);

    user.isOnboardingCompleted = true;
    await this.usersRepository.save(user);

    return {
      message: 'Onboarding de cliente completado',
      profile: savedProfile,
    };
  }
}