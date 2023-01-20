import { IsEmail, IsNotEmpty } from 'class-validator';
import { SubscriberValidationMessage } from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, {message: SubscriberValidationMessage.EmailNotValid})
  email: string;

  @IsNotEmpty({message: SubscriberValidationMessage.NameNotValid})
  name: string;

  @IsNotEmpty({message: SubscriberValidationMessage.UserIdNotValid})
  userId: string;
}
