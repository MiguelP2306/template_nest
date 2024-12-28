import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { enviroments, Environment } from '../../enviroments';
import { DbEngineType } from '../commons/Interface/database.interface';

const pathEnv = enviroments[process.env.NODE_ENV as Environment] || enviroments.prod
dotenv.config({ path: pathEnv });

const { DB_DATABASE, DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_ENGINE } =
  process.env;

export const dataSourceOptions = new DataSource({
  type: DB_ENGINE as DbEngineType,
  url: `${DB_ENGINE}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  logging: false,
  synchronize: false,
  entities: ['./src/**/*.entity{.ts,.js}'],
  migrations: ['./src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
