import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { EMAIL_NOT_VALID } from '../task.constant';

export class NotifyUserDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'user@mail.ru'
  })
  @IsEmail({}, {message: EMAIL_NOT_VALID})
  public email: string;
}
