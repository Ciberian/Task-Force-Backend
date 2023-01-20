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
import { ApiProperty } from '@nestjs/swagger';
import { City } from '@taskforce/shared-types';
import { MAX_SPECIALIZATIONS_COUNT } from '../auth.constant';
import { UserValidationMessage } from '../../user/user.constant';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Вася'
  })
  @IsOptional()
  @IsString()
  @Length(3, 50, {message: UserValidationMessage.NameLengthNotValid})
  public name?: string;

  @ApiProperty({
    description: 'User birth date',
    example: '2002-02-20'
  })
  @IsOptional()
  @IsISO8601({message: UserValidationMessage.BirthDateNotValid})
  public birthDate?: string;

  @ApiProperty({
    description: 'User personal information',
    example: 'The best specialist ever'
  })
  @IsOptional()
  @IsString()
  @Matches(/\S/)
  @Length(0, 300, {message: UserValidationMessage.PersonalInfoMaxLengthNotValid})
  public personalInfo?: string;

  @ApiProperty({
    description: 'User specializations',
    example: ['Big', 'Boss', 'Chief', 'Engineer'],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(MAX_SPECIALIZATIONS_COUNT)
  @IsString({each: true, message: UserValidationMessage.SpecializationNotValid})
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
