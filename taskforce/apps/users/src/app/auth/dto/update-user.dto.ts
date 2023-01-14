import { ApiProperty } from '@nestjs/swagger';
import { City } from '@taskforce/shared-types';
import {
  IsISO8601,
  IsString,
  IsOptional,
  Length,
  IsEnum,
  Matches,
  IsArray,
  ArrayMaxSize
} from 'class-validator';
import {
  AUTH_USER_BIRTH_DATE_NOT_VALID,
  AUTH_USER_NAME_NOT_VALID,
  MAX_SPECIALIZATIONS_COUNT,
  SPECIALIZATION_NOT_VALID,
  USER_PERSONAL_INFO_NOT_VALID
} from '../auth.constant';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Вася'
  })
  @IsOptional()
  @IsString()
  @Length(3, 50, {message: AUTH_USER_NAME_NOT_VALID})
  public name?: string;

  @ApiProperty({
    description: 'User birth date',
    example: '2002-02-20'
  })
  @IsOptional()
  @IsISO8601({message: AUTH_USER_BIRTH_DATE_NOT_VALID})
  public birthDate?: string;

  @ApiProperty({
    description: 'User personal information',
    example: 'The best specialist ever'
  })
  @IsOptional()
  @IsString()
  @Matches(/\S/)
  @Length(0, 300, {message: USER_PERSONAL_INFO_NOT_VALID})
  public personalInfo?: string;

  @ApiProperty({
    description: 'User specializations',
    example: ['Big', 'Boss', 'Chief', 'Engineer'],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(MAX_SPECIALIZATIONS_COUNT)
  @IsString({each: true, message: SPECIALIZATION_NOT_VALID})
  public specialization?: string[];

  @ApiProperty({
    description: 'City name',
    example: 'Москва'
  })
  @IsOptional()
  @IsEnum(City)
  public city?: City;

  @ApiProperty({
    description: 'User avatar',
    example: 'my-awesome-avatar.png'
  })
  @IsOptional()
  @IsString()
  public avatar?: string;
}
