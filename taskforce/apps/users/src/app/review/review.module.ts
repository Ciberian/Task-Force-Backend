import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModel, ReviewSchema } from './review.model';
import { ReviewRepository } from './review.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ReviewModel.name, schema: ReviewSchema }]),
  ],
  providers: [ReviewRepository],
  exports: [ReviewRepository],
})
export class ReviewModule {}
