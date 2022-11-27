import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentInterface } from '@taskforce/shared-types';
import { CRUDRepositoryInterface } from '@taskforce/core';
import { CommentEntity } from './comment.entity';
import { CommentModel } from './comment.model';

@Injectable()
export class CommentRepository implements CRUDRepositoryInterface<CommentEntity, string, CommentInterface> {
  constructor(
    @InjectModel(CommentModel.name) private readonly CommentModel: Model<CommentModel>) {
  }

  public async create(item: CommentEntity): Promise<CommentInterface> {
    const newComment = new this.CommentModel(item);
    return newComment.save();
  }

  public async find(taskId: string): Promise<CommentInterface[] | null> {
    return this.CommentModel
      .find({taskId})
      .exec();
  }

  public async findById(id: string): Promise<CommentInterface | null> {
    return this.CommentModel
      .findOne({id})
      .exec();
  }

  public async update(id: string, item: CommentEntity): Promise<CommentInterface> {
    return this.CommentModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }

  public async delete(id: string): Promise<void> {
    this.CommentModel.deleteOne({id});
  }
}
