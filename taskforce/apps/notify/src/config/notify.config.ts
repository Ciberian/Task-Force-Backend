import { registerAs } from '@nestjs/config';

export default registerAs('notify', () => ({
  server: process.env.SMTP_SERVER,
  port: parseInt(process.env.SMTP_SERVER_PORT, 10)
}));
