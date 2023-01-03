import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { getSmtpConfig } from '../../config/notify.config';
import { SmtpService } from './smtp.service';

@Module({
  imports: [
    MailerModule.forRootAsync(getSmtpConfig())
  ],
  providers: [
    SmtpService
  ],
  exports: [
    SmtpService
  ]
})
export class SmtpModule {}
