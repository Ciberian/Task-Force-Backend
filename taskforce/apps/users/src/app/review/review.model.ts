import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ReviewInterface } from '@taskforce/shared-types';
import { Review, ReviewValidationMessage } from './review.constant';

@Schema({collection: 'reviews'})
export class ReviewModel extends Document implements ReviewInterface {
  @Prop({required: true})
  public customerId: mongoose.Types.ObjectId;

  @Prop({required: true})
  public contractorId: mongoose.Types.ObjectId;

  @Prop({required: true})
  public taskId: number;

  @Prop({
    required: true,
    minlength: [Review.MinTextLength, ReviewValidationMessage.TextMinLengthNotValid],
    maxlength: [Review.MaxTextLength, ReviewValidationMessage.TextMaxLengthNotValid],
  })
  public reviewText: string;

  @Prop({
    required: true,
    min: Review.MinReviewRating,
    max: Review.MaxReviewRating,
  })
  public reviewRating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
