import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { getRabbitMqConfig, NotifyQueue } from './config/rabbitmq.config';

const GLOBAL_PREFIX = 'api';
const DEFAULT_PORT = 3333;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  app.connectMicroservice(getRabbitMqConfig(configService, NotifyQueue.Subscribers));
  app.connectMicroservice(getRabbitMqConfig(configService, NotifyQueue.Comments));

  await app.startAllMicroservices();
  Logger.log(`🚀 Notify service is running on`);

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix(GLOBAL_PREFIX);
  const port = process.env.PORT || DEFAULT_PORT;
  await app.listen(port);
  Logger.log(`🚀 REST is running on: http://localhost:${port}/${GLOBAL_PREFIX}`);
}

bootstrap();
