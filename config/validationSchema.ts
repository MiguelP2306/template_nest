import * as Joi from 'joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_HOST: Joi.string().hostname().required(),
});
