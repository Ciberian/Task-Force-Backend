import * as Joi from 'joi';

const DEFAULT_RABBIT_PORT = 5672;

export default Joi.object({
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
    RABBIT_TASKS_SERVICE_QUEUE: Joi
    .string()
    .required(),
});
