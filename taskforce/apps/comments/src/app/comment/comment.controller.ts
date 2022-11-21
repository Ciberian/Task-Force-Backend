import { Body, Param, Controller, Get, Post, Delete } from '@nestjs/common';
import { fillDTO } from '@taskforce/core';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';

@Controller('tasks')
export class CommentController {

  constructor(private readonly commentService: CommentService) {}

  @Post(':taskId')
  async create(@Param('taskId') taskId: string, @Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.create(taskId, dto);

    return fillDTO(CommentRdo, newComment);
  }

  @Get(':taskId/comments')
  async showComments(@Param('taskId') taskId: string) {
    const comments = await this.commentService.getTaskComments(taskId);

    return fillDTO(CommentRdo, comments);
  }

  @Delete(':taskId/comments')
  async show(@Param('taskId') taskId: string) {
    this.commentService.deleteTaskComments(taskId);
  }
}
