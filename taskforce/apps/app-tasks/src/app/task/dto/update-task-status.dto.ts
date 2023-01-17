import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTaskStatusDto {
  @ApiProperty({
    description: 'Task unique id',
    example: 'AtWork'
  })
  @IsEnum(TaskStatus)
  public newStatus!: TaskStatus;

  @ApiProperty({
    description: 'Customer unique ID',
    example: '6385bbbcc05cd5e757d37764'
  })
  @IsString()
  public customerId: string;

  @ApiProperty({
    description: 'Contractor unique ID',
    example: '63ba8f0aa99e326258f2ea6a'
  })
  @IsString()
  @IsOptional()
  public contractorId?: string;
}
