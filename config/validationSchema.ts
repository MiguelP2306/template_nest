import * as Joi from 'joi';

// Commons
import { MYSQL, POSTGRES } from '../src/commons/constants';

export const configSchema = Joi.object({
  DB_DATABASE: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_HOST: Joi.string().hostname().required(),
  JWT_SECRET: Joi.string().required(),
  DB_ENGINE: Joi.string().valid(MYSQL, POSTGRES).required(),
  NODE_ENV: Joi.string().required(),
  APP_PORT: Joi.string().required(),
  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.string().required(),
  EMAIL_USER: Joi.string().required(),
  EMAIL_PASS: Joi.string().required(),
});
