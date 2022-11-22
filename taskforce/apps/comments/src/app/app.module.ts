import { Module } from '@nestjs/common';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { CommentsModule } from './comment/comment.module';

@Module({
  imports: [CommentsModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class AppModule {}
