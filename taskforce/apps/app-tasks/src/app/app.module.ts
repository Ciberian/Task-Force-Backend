import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './task/task.module';
import { ENV_FILE_PATH } from './app.constant';
import envSchema from './env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [rabbitMqOptions],
      validationSchema: envSchema,
    }),
    TaskModule,
    PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
