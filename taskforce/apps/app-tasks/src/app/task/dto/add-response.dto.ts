import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddResponseDto {
  @ApiProperty({
    description: 'Contractor unique id',
    example: '1234bbbcc05cd5e757da7777'
  })
  @IsString()
  public contractorId: string;
}
