import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@taskforce/shared-types';
import { IsEnum, IsString } from 'class-validator';

export class GetPersonalTasksDto {
  @ApiProperty({
    description: 'User unique id',
    example: '6385bbbcc05cd5e757d37764'
  })
  @IsString()
  public userId: string;

  @ApiProperty({
    description: 'User role',
    example: 'Исполнитель'
  })
  @IsEnum(UserRole)
  public userRole: UserRole;
}
