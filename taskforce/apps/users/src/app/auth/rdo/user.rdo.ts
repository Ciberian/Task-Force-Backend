import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { City, UserRole } from '@taskforce/shared-types';

export class UserRdo {
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
