import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { MeService } from './me.service';

// Contollers
import { MeController } from './me.controller';

// Entity
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [MeController],
  providers: [MeService]
})
export class MeModule {}
