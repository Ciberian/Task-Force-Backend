import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsAlphanumeric, Length } from 'class-validator';
import { UserValidationMessage } from '../../user/user.constant';

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.ru'
  })
  @IsEmail({}, {message: UserValidationMessage.EmailNotValid})
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty12345'
  })
  @IsAlphanumeric()
  @Length(6, 12, {message: UserValidationMessage.PasswordNotValid})
  public password: string;
}
