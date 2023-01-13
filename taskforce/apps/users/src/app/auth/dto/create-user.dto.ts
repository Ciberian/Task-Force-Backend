import { ApiProperty } from '@nestjs/swagger';
import { City, UserRole } from '@taskforce/shared-types';
import {
  IsEmail,
  IsISO8601,
  IsString,
  IsAlphanumeric,
  IsOptional,
  Length,
  IsEnum
} from 'class-validator';
import {
  AUTH_USER_EMAIL_NOT_VALID,
  AUTH_USER_PASSWORD_NOT_VALID,
  AUTH_USER_BIRTH_DATE_NOT_VALID,
  AUTH_USER_NAME_NOT_VALID
} from '../auth.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Вася'
  })
  @IsString()
  @Length(3, 50, {message: AUTH_USER_NAME_NOT_VALID})
  public name!: string;

  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.ru'
  })
  @IsEmail({}, {message: AUTH_USER_EMAIL_NOT_VALID})
  public email!: string;

  @ApiProperty({
    description: 'City name',
    example: 'Москва'
  })
  @IsEnum(City)
  public city!: City;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty12345'
  })
  @IsAlphanumeric()
  @Length(6, 12, {message: AUTH_USER_PASSWORD_NOT_VALID})
  public password!: string;

  @ApiProperty({
    description: 'User role',
    example: 'Заказчик'
  })
  @IsEnum(UserRole)
  public role!: UserRole;

  @ApiProperty({
    description: 'User avatar',
    example: 'my-awesome-avatar.png'
  })
  @IsOptional()
  @IsString()
  public avatar?: string;

  @ApiProperty({
    description: 'User birth date',
    example: '2002-02-20'
  })
  @IsISO8601({message: AUTH_USER_BIRTH_DATE_NOT_VALID})
  public birthDate!: string;
}
