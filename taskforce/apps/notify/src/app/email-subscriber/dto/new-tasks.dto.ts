import { IsEmail, IsArray } from 'class-validator';
import { SubscriberValidationMessage } from '../email-subscriber.constant';

export class NewTasksDto {
  @IsEmail({}, {message: SubscriberValidationMessage.EmailNotValid})
  email: string;

  @IsArray()
  titles: string[];
}
