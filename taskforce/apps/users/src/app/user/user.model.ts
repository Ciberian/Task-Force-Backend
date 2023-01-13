import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { City, UserInterface, UserRole } from '@taskforce/shared-types';

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 50;
const MAX_PERSONAL_INFO_LENGTH = 300;

@Schema({collection: 'users'})
export class UserModel extends Document implements UserInterface {
  @Prop({
    required: true,
    minlength: [MIN_NAME_LENGTH, 'Min length for the name is 3 simbol'],
    maxlength: [MAX_NAME_LENGTH, 'Max length for the name is 50 simbols'],
  })
  public name: string;

  @Prop({
    required: true,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect']
  })
  public email: string;

  @Prop({
    required: true,
    type: String,
    enum: City,
    default: City.Moscow
  })
  public city: City;

  @Prop({
    required: true
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.Contractor
  })
  public role: UserRole;

  @Prop({
    match: [/^(?:.*\.(?=(jpg|jpeg|png)$))?[^.]*$/i, 'Only jpg/jpeg or png format is allowed']
  })
  public avatar: string;

  @Prop({
    required: true,
  })
  public birthDate: Date;

  @Prop()
  public registrationDate: string;

  @Prop({
    maxlength: [MAX_PERSONAL_INFO_LENGTH, 'Max length for the name is 300 simbols'],
  })
  public personalInfo: string;

  @Prop()
  public createdTasks?: number;

  @Prop()
  public newTasks?: number;

  @Prop()
  public specialization?: string;

  @Prop({
    min: 0,
    max: 5
  })
  public rank?: number;

  @Prop({
    min: 0,
    max: 5
  })
  public rating?: number;

  @Prop({
    min: 0
  })
  public failedTasksCount?: number;

  @Prop({
    min: 0
  })
  public completedTasksCount?: number;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
