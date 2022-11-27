import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '638348b04f5f6091439ea5b2'
  })
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Access token',
    example: 'user@user.ru'
  })
  @Expose()
  public accessToken: string;
}
