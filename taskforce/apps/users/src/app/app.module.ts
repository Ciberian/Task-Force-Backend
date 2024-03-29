import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig } from '@taskforce/core';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { jwtConfig } from '../config/jwt.config';
import { ENV_FILE_PATH } from './app.constant';
import databaseConfig from '../config/database.config';
import envSchema from './env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, jwtConfig, rabbitMqOptions],
      validationSchema: envSchema,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    AuthModule,
    UserModule,
    ReviewModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
