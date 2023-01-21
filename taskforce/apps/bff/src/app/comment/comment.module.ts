import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [HttpModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
