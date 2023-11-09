import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const { DB_DATABASE, DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

export const dataSourceOptions = new DataSource({
  type: 'mysql',
  url: `mysql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  logging: false,
  synchronize: false,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
