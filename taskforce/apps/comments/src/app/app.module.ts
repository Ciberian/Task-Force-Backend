import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig } from '@taskforce/core';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { CommentsModule } from './comment/comment.module';
import { ENV_FILE_PATH } from './app.constant';
import databaseConfig from '../config/database.config';
import envSchema from './env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig],
      validationSchema: envSchema
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig()
    ),
    CommentsModule
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class AppModule {}
