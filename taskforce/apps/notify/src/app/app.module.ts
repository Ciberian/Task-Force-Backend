import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { smtpOptions } from '../config/notify.config';
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
    MongooseModule.forRootAsync(getMongoDbConfig()),
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
