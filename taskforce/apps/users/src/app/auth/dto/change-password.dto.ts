import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, Length } from 'class-validator';
import { UserValidationMessage } from '../../user/user.constant';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User old password',
    example: 'abcdef123'
  })
  @IsAlphanumeric()
  @Length(6, 12, {message: UserValidationMessage.PasswordNotValid})
  public oldPassword: string;

  @ApiProperty({
    description: 'User new password',
    example: '321fedcba'
  })
  @IsAlphanumeric()
  @Length(6, 12, {message: UserValidationMessage.PasswordNotValid})
  public newPassword: string;
}

