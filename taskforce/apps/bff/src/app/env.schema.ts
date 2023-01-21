import * as Joi from 'joi';

export const envSchema = Joi.object({
  TASKS_SERVICE_URL: Joi
    .string()
    .required(),
  COMMENTS_SERVICE_URL: Joi
    .string()
    .required(),
  USERS_SERVICE_URL: Joi
    .string()
    .required(),
  NOTIFY_SERVICE_URL: Joi
    .string()
    .required(),
});
