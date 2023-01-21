import { registerAs } from '@nestjs/config';

export const servicesOptions = registerAs('services', () => ({
  tasks: process.env.TASKS_SERVICE_URL,
  comments: process.env.COMMENTS_SERVICE_URL,
  users: process.env.USERS_SERVICE_URL,
  notify: process.env.NOTIFY_SERVICE_URL,
}));
