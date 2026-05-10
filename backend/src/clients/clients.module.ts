import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ClientProfile } from './entities/client-profile.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientProfile, User])],
  providers: [ClientsService],
  controllers: [ClientsController],
})
export class ClientsModule {}
