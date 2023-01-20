import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CommentInterface } from '@taskforce/shared-types';
import { Comment, CommentValidationMessage } from './comments.constant';

@Schema({collection: 'comments'})
export class CommentModel extends Document implements CommentInterface {
  @Prop({
    required: true
  })
  taskId: string;

  @Prop({
    required: true,
    minlength: [Comment.MinLength, CommentValidationMessage.CommentMinLengthNotValid],
    maxlength: [Comment.MaxLength, CommentValidationMessage.CommentMaxLengthNotValid]
  })
  text: string;

  @Prop()
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(CommentModel);
