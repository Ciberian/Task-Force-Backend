import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class PersonalTasksQuery {
  @ApiProperty({
    description: 'Tasks status',
    example: 'AtWork',
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  public status?: TaskStatus;
}
