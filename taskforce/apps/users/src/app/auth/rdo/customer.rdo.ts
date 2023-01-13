import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { City, UserRole } from '@taskforce/shared-types';

export class CustomerRdo {
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
    description: 'User birth date',
    example: 22
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
    example: 'I am the customer. I give people jobs so they can make a lot of dough'
  })
  @Expose()
  public personalInfo: string;

  @ApiProperty({
    description: 'User created tasks count',
    example: 4
  })
  @Expose()
  public createdTasks: number;

  @ApiProperty({
    description: 'User new tasks count',
    example: 4
  })
  @Expose()
  public newTasks: number;
}
