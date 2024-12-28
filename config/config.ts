import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    name: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    engine: process.env.DB_ENGINE,
  },
  jwtSecret: process.env.JWT_SECRET,
  appPort: process.env.APP_PORT
}));
