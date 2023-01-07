import { IsEmail, IsArray } from 'class-validator';
import { EMAIL_NOT_VALID } from '../email-subscriber.constant';

export class NewTasksDto {
  @IsEmail({}, {message: EMAIL_NOT_VALID})
  email: string;

  @IsArray()
  titles: string[];
}
