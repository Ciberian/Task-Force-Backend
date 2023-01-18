import { ConfigService, registerAs }  from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

export const NotifyQueue = {
  Comments: 'rmq.commentsQueue',
  Subscribers: 'rmq.subscribersQueue',
} as const;

type Queue = typeof NotifyQueue[keyof typeof NotifyQueue];

export const rabbitMqOptions = registerAs('rmq', () => ({
  user: process.env.RABBIT_USER,
  password: process.env.RABBIT_PASSWORD,
  host: process.env.RABBIT_HOST,
  commentsQueue: process.env.RABBIT_NOTIFY_SERVICE_COMMENTS_QUEUE,
  subscribersQueue: process.env.RABBIT_NOTIFY_SERVICE_SUBSCRIBERS_QUEUE,
}));

export function getRabbitMqConfig(configService: ConfigService, queueType: Queue): RmqOptions {
  const user = configService.get<string>('rmq.user');
  const password = configService.get<string>('rmq.password');
  const host = configService.get<string>('rmq.host');
  const queue = configService.get<string>(queueType);
  const url = `amqp://${user}:${password}@${host}`;

  return {
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue,
      persistent: true,
      noAck: true,
      queueOptions: {
        durable: true,
      }
    }
  }
}
