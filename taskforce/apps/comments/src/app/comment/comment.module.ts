import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule} from '@nestjs/mongoose';
import { ClientsModule } from '@nestjs/microservices';
import { CommentModel, CommentSchema } from './comment.model';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';
import { CommentRepository } from './comment.repository';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { RABBITMQ_SERVICE } from './comments.constant';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: CommentModel.name, schema: CommentSchema}
    ]),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      }
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentsModule {}
