import { ApiProperty } from '@nestjs/swagger';
import { City, UserRole } from '@taskforce/shared-types';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'City name',
    example: 'Москва'
  })
  public city: City;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty12345'
  })
  public password: string;

  @ApiProperty({
    description: 'User birth date',
    example: '2002-02-20'
  })
  public birthDate: string;

  @ApiProperty({
    description: 'User role',
    example: 'Заказчик'
  })
  public role: UserRole;

  @ApiProperty({
    description: 'User name',
    example: 'Вася'
  })
  public name: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'my-awesome-avatar.png'
  })
  public avatar?: string;
}
