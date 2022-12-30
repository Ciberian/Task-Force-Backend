import { ConfigService, registerAs } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';

export const smtpOptions = registerAs('notify', () => ({
  host: process.env.SMTP_SERVER,
  port: parseInt(process.env.SMTP_SERVER_PORT, 10)
}));

export function getSmtpConfig() {
  return {
    useFactory: async (configService: ConfigService): Promise<MailerOptions> => {
      return {
      transport: {
        host: configService.get<string>('notify.host'),
        port: configService.get<number>('notify.port'),
      },
    }},
    inject: [ConfigService],
  };
}
