import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

// Config
import config from '../../config/config';
import { DbEngineType } from '../commons/Interface/database.interface';

const dbConfig = (configService: ConfigType<typeof config>): TypeOrmModuleOptions => ({
  type: configService.database.engine as DbEngineType,
  host: configService.database.host,
  port: Number(configService.database.port),
  username: configService.database.user,
  password: configService.database.password,
  database: configService.database.name,
  autoLoadEntities: true,
  synchronize: false,
});

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: dbConfig,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
