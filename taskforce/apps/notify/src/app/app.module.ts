import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import notifyConfig, { getSmtpConfig } from '../config/notify.config';
import { getMongoDbConfig, mongoDbOptions } from '../config/mongodb.config';
import { validateEnvironments } from './env.validation';
import { ENV_FILE_PATH } from './app.constant';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [notifyConfig, mongoDbOptions],
      validate: validateEnvironments
    }),
    MailerModule.forRootAsync(getSmtpConfig()),
    MongooseModule.forRootAsync(getMongoDbConfig())
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
