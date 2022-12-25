import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import notifyConfig, { getSmtpConfig } from '../config/notify.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: 'environments/.notify.env',
      load: [notifyConfig],
    }),
    MailerModule.forRootAsync(getSmtpConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
