import { Module } from '@nestjs/common';
import { MongooseModule} from '@nestjs/mongoose';
import { CommentModel, CommentSchema } from './comment.model';
import { CommentRepository } from './comment.repository';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: CommentModel.name, schema: CommentSchema }
  ])],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
  exports: [CommentRepository],
})
export class CommentsModule {}
