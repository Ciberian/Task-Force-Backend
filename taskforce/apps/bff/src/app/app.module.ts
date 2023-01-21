import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { servicesOptions } from '../config/services.config';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { NotifyModule } from './notify/notify.module';
import { ENV_FILE_PATH } from './app.constant';
import { envSchema } from './env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [servicesOptions],
      validationSchema: envSchema,
    }),
    UserModule,
    TaskModule,
    CommentModule,
    NotifyModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
