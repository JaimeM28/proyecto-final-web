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
      throw new ForbiddenException(
        'Solo proveedores pueden completar este onboarding',
      );
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
  async findAll(filters: { trade?: string; location?: string }) {
    const query = this.providerProfileRepository
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .select([
        'profile.id',
        'profile.trade',
        'profile.location',
        'profile.description',
        'profile.price',
        'user.id',
        'user.name',
        'user.email',
        'user.role',
      ]);

    if (filters.trade) {
      query.andWhere('LOWER(profile.trade) LIKE LOWER(:trade)', {
        trade: `%${filters.trade}%`,
      });
    }

    if (filters.location) {
      query.andWhere('LOWER(profile.location) LIKE LOWER(:location)', {
        location: `%${filters.location}%`,
      });
    }

    const providers = await query.getMany();

    return providers.map((provider) => ({
      id: provider.id,
      trade: provider.trade,
      location: provider.location,
      description: provider.description,
      price: provider.price,
      user: {
        id: provider.user.id,
        name: provider.user.name,
        email: provider.user.email,
        role: provider.user.role,
      },
    }));
  }

  async findOne(id: string) {
    const provider = await this.providerProfileRepository
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .select([
        'profile.id',
        'profile.trade',
        'profile.location',
        'profile.description',
        'profile.price',
        'user.id',
        'user.name',
        'user.email',
        'user.role',
      ])
      .where('profile.id = :id', { id })
      .getOne();

    if (!provider) {
      throw new NotFoundException('Proveedor no encontrado');
    }

    return {
      id: provider.id,
      trade: provider.trade,
      location: provider.location,
      description: provider.description,
      price: provider.price,
      user: {
        id: provider.user.id,
        name: provider.user.name,
        email: provider.user.email,
        role: provider.user.role,
      },
    };
  }
}
