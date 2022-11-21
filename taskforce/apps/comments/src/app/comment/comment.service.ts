import { Injectable } from '@nestjs/common';
import { CommentInterface } from '@taskforce/shared-types';
import { CommentMemoryRepository } from './comment-memory.repository';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

const COMMENTS_COUNT = 50;

@Injectable()
export class CommentService {
  constructor(private readonly commentMemoryRepository: CommentMemoryRepository) {}

  async create(taskId: string, dto: CreateCommentDto) {
    const {text} = dto;
    const comment: CommentInterface = {
      _id: '',
      taskId,
      text,
    };

    const commentEntity = new CommentEntity(comment);

    return this.commentMemoryRepository.create(commentEntity);
  }

  async getTaskComments(taskId: string) {
    const allComments = await this.commentMemoryRepository.find();

    return allComments
      .filter((comment) => comment.taskId === taskId)
      .slice(0, COMMENTS_COUNT)
  }

  async deleteComment(id: string) {
    console.log('ID-----------------------', id);
    return this.commentMemoryRepository.delete(id);
  }

  async deleteTaskComments(taskId: string) {
    const allComments = await this.commentMemoryRepository.find();
    const taskComments = allComments.filter((comment) => comment.taskId === taskId);
    taskComments.forEach(async (comment) => await this.deleteComment(comment._id));

    return `Comments for task with ID - ${taskId}, has been deleted`;
  }
}

