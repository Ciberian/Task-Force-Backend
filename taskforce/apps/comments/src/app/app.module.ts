import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig } from '@taskforce/core';
import { CommentsModule } from './comment/comment.module';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { ENV_FILE_PATH } from './app.constant';
import databaseConfig from '../config/database.config';
import envSchema from './env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, rabbitMqOptions],
      validationSchema: envSchema
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    CommentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
