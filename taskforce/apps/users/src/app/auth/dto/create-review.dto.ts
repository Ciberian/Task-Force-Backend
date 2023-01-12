import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNumber, Min, Max } from 'class-validator';
import {
  MAX_REVIEW_RATING_NOT_VALID,
  MIN_REVIEW_RATING_NOT_VALID,
  REVIEW_TEXT_NOT_VALID,
} from '../auth.constant';

export class CreateReviewDto {
  @ApiProperty({
    description: 'The ID of the user who created the task',
    example: '77de8656897358c0e03747e9',
  })
  @IsString()
  public customerId!: string;

  @ApiProperty({
    description: 'The ID of the user who completed the task',
    example: '63bf8649406358c0e03747e4',
  })
  @IsString()
  public contractorId!: string;

  @ApiProperty({
    description: 'Task unique id',
    example: 100500,
  })
  @IsNumber()
  public taskId!: number;

  @ApiProperty({
    description: 'Review text',
    example: 'He did such a great job and were quick and efficient',
  })
  @IsString()
  @Length(50, 500, { message: REVIEW_TEXT_NOT_VALID })
  public reviewText!: string;

  @ApiProperty({
    description: 'Review rating',
    example: 5,
  })
  @IsNumber()
  @Min(1, { message: MIN_REVIEW_RATING_NOT_VALID })
  @Max(5, { message: MAX_REVIEW_RATING_NOT_VALID })
  public reviewRating!: number;
}
