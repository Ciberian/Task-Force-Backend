import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import notifyConfig, { getSmtpConfig } from '../config/notify.config';
import { ENV_FILE_PATH } from './app.constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [notifyConfig],
    }),
    MailerModule.forRootAsync(getSmtpConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
