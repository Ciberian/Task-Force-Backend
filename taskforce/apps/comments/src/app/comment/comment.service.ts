import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CommandEvent, CommentInterface, CommentsCountUpdateType } from '@taskforce/shared-types';
import { CommentRepository } from './comment.repository';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { RABBITMQ_SERVICE } from './comments.constant';

const COMMENTS_COUNT = 50;

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}

  async create(taskId: string, dto: CreateCommentDto) {
    const {text} = dto;
    const comment: CommentInterface = {
      taskId,
      text,
      createdAt: new Date(),
    };

    const commentEntity = new CommentEntity(comment);
    const createdComment = await this.commentRepository.create(commentEntity);

    if (createdComment._id) {
      this.rabbitClient.emit(
        {
          cmd: CommandEvent.ChangeCommentsCount
        },
        {
          id: taskId,
          updateType: CommentsCountUpdateType.Increase
        }
      )
    }

    return createdComment;
  }

  async getTaskComments(taskId: string) {
    const allComments = await this.commentRepository.find(taskId);

    return allComments.slice(0, COMMENTS_COUNT)
  }

  async deleteComment(id: string) {
    const deletingComment = await this.commentRepository.findById(id);
    await this.commentRepository.delete(id);

    this.rabbitClient.emit(
      {
        cmd: CommandEvent.ChangeCommentsCount
      },
      {
        id: deletingComment.taskId,
        updateType: CommentsCountUpdateType.Decrease
      }
    )
  }

  async deleteTaskComments(taskId: string) {
    await this.commentRepository.deleteMany(taskId);
  }
}

