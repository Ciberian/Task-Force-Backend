import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { City, UserRole } from '@taskforce/shared-types';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '42d448f8-9111-4ad7-ac70-2b6dd34af25'
  })
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
    description: 'User avatar',
    example: 'my-awesome-avatar.png'
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User birth date',
    example: '2002-02-20'
  })
  @Expose()
  public birthDate: string;
}
