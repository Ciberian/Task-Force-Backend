import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewInterface } from '@taskforce/shared-types';
import { CRUDRepositoryInterface } from '@taskforce/core';
import { ReviewEntity } from './review.entity';
import { ReviewModel } from './review.model';

@Injectable()
export class ReviewRepository implements CRUDRepositoryInterface<ReviewEntity, string, ReviewInterface> {
  constructor(@InjectModel(ReviewModel.name) private readonly ReviewModel: Model<ReviewModel>) {}

  public async create(item: ReviewEntity): Promise<ReviewInterface> {
    const newReview = new this.ReviewModel(item);
    return newReview.save();
  }

  public async findById(id: string): Promise<ReviewInterface | null> {
    return this.ReviewModel.findById(id).exec();
  }

  public async findByTaskId(taskId: number): Promise<ReviewInterface | null> {
    return this.ReviewModel.findOne({taskId}).exec();
  }

  public async findUserReviews(userId: mongoose.Types.ObjectId): Promise<ReviewInterface[] | null> {
    return this.ReviewModel.find({userId}).exec();
  }

  public async update(id: string, item: ReviewEntity): Promise<ReviewInterface> {
    return this.ReviewModel.findByIdAndUpdate(id, item.toObject(), {new: true}).exec();
  }

  public async delete(id: string): Promise<void> {
    this.ReviewModel.deleteOne({_id: id});
  }
}
