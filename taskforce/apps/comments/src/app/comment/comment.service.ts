import { Injectable } from '@nestjs/common';
import { CommentInterface } from '@taskforce/shared-types';
import { CommentRepository } from './comment.repository';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

const COMMENTS_COUNT = 50;

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async create(taskId: string, dto: CreateCommentDto) {
    const {text} = dto;
    const comment: CommentInterface = {
      taskId,
      text,
      createdAt: new Date(),
    };

    const commentEntity = new CommentEntity(comment);

    return this.commentRepository.create(commentEntity);
  }

  async getTaskComments(taskId: string) {
    const allComments = await this.commentRepository.find(taskId);

    return allComments.slice(0, COMMENTS_COUNT)
  }

  async deleteComment(id: string) {
    await this.commentRepository.delete(id);
  }

  async deleteTaskComments(taskId: string) {
    await this.commentRepository.deleteMany(taskId);
  }
}

