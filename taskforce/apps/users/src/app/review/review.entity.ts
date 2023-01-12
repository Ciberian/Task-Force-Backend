import { ReviewInterface } from '@taskforce/shared-types';
import mongoose from 'mongoose';

export class ReviewEntity implements ReviewInterface {
  public _id: string;
  public customerId: mongoose.Types.ObjectId;
  public contractorId: mongoose.Types.ObjectId;
  public taskId: number;
  public reviewText: string;
  public reviewRating: number;

  constructor(review: ReviewInterface) {
    this.fillEntity(review);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(review: ReviewInterface) {
    this._id = review._id;
    this.customerId = review.customerId;
    this.contractorId = review.contractorId;
    this.taskId = review.taskId;
    this.reviewText = review.reviewText;
    this.reviewRating = review.reviewRating;
  }
}
