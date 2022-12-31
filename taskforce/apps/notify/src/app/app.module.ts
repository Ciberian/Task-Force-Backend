import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { getSmtpConfig, smtpOptions } from '../config/notify.config';
import { getMongoDbConfig, mongoDbOptions } from '../config/mongodb.config';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { validateEnvironments } from './env.validation';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { ENV_FILE_PATH } from './app.constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [smtpOptions, rabbitMqOptions, mongoDbOptions],
      validate: validateEnvironments
    }),
    MailerModule.forRootAsync(getSmtpConfig()),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    EmailSubscriberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
