import { Body, Param, Controller, Get, Post, Delete, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { fillDTO } from '@taskforce/core';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':taskId')
  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: 'Comment has been successfully created'
  })
  async create(@Param('taskId') taskId: string, @Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.create(taskId, dto);

    return fillDTO(CommentRdo, newComment);
  }

  @Get(':taskId')
  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Comments were successfully received'
  })
  async showComments(@Param('taskId') taskId: string) {
    const comments = await this.commentService.getTaskComments(taskId);

    return fillDTO(CommentRdo, comments);
  }

  @Delete(':taskId/task-comments')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comments were successfully deleted'
  })
  async deleteComments(@Param('taskId') taskId: string) {
    await this.commentService.deleteTaskComments(taskId);

    return `Comments for task with ID - ${taskId}, has been deleted`;
  }

  @Delete('/:commentId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment was successfully deleted'
  })
  async deleteOneComment(@Param('commentId') commentId: string) {
    await this.commentService.deleteComment(commentId);

    return `Comments with ID - ${commentId}, has been deleted`;
  }
}
