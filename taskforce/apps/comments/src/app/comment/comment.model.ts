import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CommentInterface } from '@taskforce/shared-types';

const MIN_COMMENT_LENGTH = 10;
const MAX_COMMENT_LENGTH = 300;

@Schema({collection: 'comments'})
export class CommentModel extends Document implements CommentInterface {
  @Prop({
    required: true
  })
  taskId: string;

  @Prop({
    required: true,
    minlength: [MIN_COMMENT_LENGTH, 'Min length for the comment is 10 simbols'],
    maxlength: [MAX_COMMENT_LENGTH, 'Max length for the comment is 300 simbols']
  })
  text: string;
}

export const CommentSchema = SchemaFactory.createForClass(CommentModel);
