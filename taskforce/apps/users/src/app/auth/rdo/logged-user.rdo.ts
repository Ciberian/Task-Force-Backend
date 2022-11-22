import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '42d448f8-9111-4ad7-ac70-2b6dd34af25'
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
