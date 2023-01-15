import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, Length } from 'class-validator';
import { AUTH_USER_PASSWORD_NOT_VALID } from '../auth.constant';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User old password',
    example: 'abcdef123'
  })
  @IsAlphanumeric()
  @Length(6, 12, {message: AUTH_USER_PASSWORD_NOT_VALID})
  public oldPassword: string;

  @ApiProperty({
    description: 'User new password',
    example: '321fedcba'
  })
  @IsAlphanumeric()
  @Length(6, 12, {message: AUTH_USER_PASSWORD_NOT_VALID})
  public newPassword: string;
}

