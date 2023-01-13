import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { City, UserRole } from '@taskforce/shared-types';

export class ContractorRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '638348b04f5f6091439ea5b2'
  })
  @Transform((value) => value.obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'User name',
    example: 'Вася'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'City name',
    example: 'Москва'
  })
  @Expose()
  public city: City;

  @ApiProperty({
    description: 'User role',
    example: 'Заказчик'
  })
  @Expose()
  public role: UserRole;

  @ApiProperty({
    description: 'User age',
    example: 20
  })
  @Expose()
  public age: number;

  @ApiProperty({
    description: 'User registration date',
    example: ''
  })
  @Expose()
  public registrationDate: string;

  @ApiProperty({
    description: 'User personal information',
    example: 'I am the contractor. I work hard from morning till night'
  })
  @Expose()
  public personalInfo: string;

  @ApiProperty({
    description: 'User specialization',
    example: 'Driver'
  })
  @Expose()
  public specialization: string;

  @ApiProperty({
    description: 'User position in global rank',
    example: 3
  })
  @Expose()
  public rank: number;

  @ApiProperty({
    description: 'User rating',
    example: 4.8
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'User failed tasks count',
    example: 4
  })
  @Expose()
  public failedTasksCount: number;

  @ApiProperty({
    description: 'User completed tasks count',
    example: 12
  })
  @Expose()
  public completedTasksCount: number;
}
