import { ConfigService, registerAs } from '@nestjs/config';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

export const smtpOptions = registerAs('notify', () => ({
  host: process.env.MAIL_SMTP_HOST,
  port: parseInt(process.env.MAIL_SMTP_PORT, 10),
  user: process.env.MAIL_USER_NAME,
  password: process.env.MAIL_USER_PASSWORD,
  from: process.env.MAIL_FROM,
}));

export function getSmtpConfig(): MailerAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => ({
      transport: {
        host: configService.get<string>('notify.host'),
        port: configService.get<number>('notify.port'),
        secure: false,
        auth: {
          user: configService.get<string>('notify.user'),
          pass: configService.get<string>('notify.password')
        }
      },
      defaults: {
        from: configService.get<string>('notify.from'),
      },
      template: {
        dir: path.resolve(__dirname, 'assets'),
        adapter: new HandlebarsAdapter(),
        options: {strict: true}
      }
    }),
    inject: [ConfigService],
  };
}
