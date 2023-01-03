import { Document } from 'mongoose';
import { SubscriberInterface } from '@taskforce/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

const SUBSCRIBERS_COLLECTION_NAME = 'email-subscribers';

@Schema({
  collection: SUBSCRIBERS_COLLECTION_NAME,
  timestamps: true,
})
export class EmailSubscriberModel extends Document implements  SubscriberInterface {
  @Prop({
    required: true,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect']
  })
  public email: string;

  @Prop({
    required: true
  })
  public name: string;

  @Prop({
    required: true
  })
  public userId: string;
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);
