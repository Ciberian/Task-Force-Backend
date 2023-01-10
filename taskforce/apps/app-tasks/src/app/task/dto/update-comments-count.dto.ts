import { ApiProperty } from '@nestjs/swagger';
import { CommentsCountUpdateType } from '@taskforce/shared-types';
import { IsEnum, IsNumber } from 'class-validator';

export class UpdateCommentsCountDto {
  @ApiProperty({
    description: 'Task unique id',
    example: 21321
  })
  @IsNumber()
  public id!: number;

  @ApiProperty({
    description: 'Decrease or increase comments count',
    example: 'increase'
  })
  @IsEnum(CommentsCountUpdateType)
  public updateType!: CommentsCountUpdateType;
}
