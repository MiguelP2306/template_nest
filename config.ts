import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    name: process.env.NODE_ENV,
    port: process.env.NODE_ENV,
  },
  apiKey: process.env.NODE_ENV,
}));
