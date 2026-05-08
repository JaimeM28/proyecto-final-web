import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ProviderProfile } from './entities/provider-profile.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProviderProfile, User]),
  ],
  providers: [ProvidersService],
  controllers: [ProvidersController]
})
export class ProvidersModule {}
