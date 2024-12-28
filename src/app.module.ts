import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

// Services
import { AuthService } from './modules/auth/services/auth/auth.service';

// Modules
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MeModule } from './modules/me/me.module';

// Config
import { configSchema } from '../config/validationSchema';
import { enviroments, Environment } from '../enviroments';
import { config } from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        enviroments[process.env.NODE_ENV as Environment] || enviroments.prod,
      load: [config],
      isGlobal: true,
      validationSchema: configSchema,
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    JwtModule,
    MeModule,
  ],
  providers: [AuthService],
})
export class AppModule {}
