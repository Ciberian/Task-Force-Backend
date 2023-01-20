import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { City, UserInterface, UserRole } from '@taskforce/shared-types';
import { User, UserValidationMessage } from './user.constant';

@Schema({collection: 'users'})
export class UserModel extends Document implements UserInterface {
  @Prop({
    required: true,
    minlength: [User.MinNameLength, UserValidationMessage.NameMinLengthNotValid],
    maxlength: [User.MaxNameLength, UserValidationMessage.NameMaxLengthNotValid],
  })
  public name: string;

  @Prop({
    required: true,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, UserValidationMessage.EmailNotValid]
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
    match: [/^(?:.*\.(?=(jpg|jpeg|png)$))?[^.]*$/i, UserValidationMessage.ImageFormatNotValid]
  })
  public avatar: string;

  @Prop({
    required: true,
  })
  public birthDate: Date;

  @Prop()
  public registrationDate: string;

  @Prop({
    maxlength: [User.MaxPersonalInfoLength, UserValidationMessage.PersonalInfoMaxLengthNotValid],
  })
  public personalInfo: string;

  @Prop()
  public createdTasks?: number;

  @Prop()
  public newTasks?: number;

  @Prop()
  public specialization?: string[];

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
