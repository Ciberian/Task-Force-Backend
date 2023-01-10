import * as Joi from 'joi';

const DEFAULT_MONGO_DB_PORT = 27018;
const DEFAULT_RABBIT_PORT = 5672;

export default Joi.object({
  MONGO_DB: Joi
    .string()
    .required(),
  MONGO_HOST: Joi
    .string()
    .hostname()
    .required(),
  MONGO_PORT: Joi
    .number()
    .port()
    .default(DEFAULT_MONGO_DB_PORT)
    .required(),
  MONGO_USER: Joi
    .string()
    .required(),
  MONGO_PASSWORD: Joi
    .string(),
  MONGO_AUTH_BASE: Joi
    .string()
    .required(),
  RABBIT_USER: Joi
    .string()
    .required(),
  RABBIT_PASSWORD: Joi
    .string()
    .required(),
  RABBIT_HOST: Joi
    .string()
    .hostname()
    .required(),
  RABBIT_PORT: Joi
    .number()
    .port()
    .default(DEFAULT_RABBIT_PORT)
    .required(),
  RABBIT_COMMENTS_SERVICE_QUEUE: Joi
    .string()
    .required(),
});
