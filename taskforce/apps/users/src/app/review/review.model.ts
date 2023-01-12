import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ReviewInterface } from '@taskforce/shared-types';

const MIN_REVIEW_TEXT_LENGTH = 50;
const MAX_REVIEW_TEXT_LENGTH = 500;
const MIN_REVIEW_RATING = 1;
const MAX_REVIEW_RATING = 5;

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
    minlength: [MIN_REVIEW_TEXT_LENGTH, 'Min length for the review text is 50 simbol'],
    maxlength: [MAX_REVIEW_TEXT_LENGTH, 'Max length for the review text is 500 simbols'],
  })
  public reviewText: string;

  @Prop({
    required: true,
    min: MIN_REVIEW_RATING,
    max: MAX_REVIEW_RATING
  })
  public reviewRating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
