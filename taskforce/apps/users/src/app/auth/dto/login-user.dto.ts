import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsAlphanumeric, Length } from 'class-validator';
import { AUTH_USER_EMAIL_NOT_VALID, AUTH_USER_PASSWORD_NOT_VALID } from '../auth.constant';

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.ru'
  })
  @IsEmail({}, {message: AUTH_USER_EMAIL_NOT_VALID})
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty12345'
  })
  @IsAlphanumeric()
  @Length(6, 12, {message: AUTH_USER_PASSWORD_NOT_VALID})
  public password: string;
}
