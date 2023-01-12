import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewRdo {
  @ApiProperty({
    description: 'The uniq review ID',
    example: '638348b04f5f6091439ea5b2'
  })
  @Transform((value) => value.obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'The uniq customer ID',
    example: '638348b04f5f6091439ea5b2'
  })
  @Transform((value) => value.obj.customerId.toString())
  @Expose()
  public customerId: string;

  @ApiProperty({
    description: 'The uniq contractor ID',
    example: '638348b04f5f6091439ea5b2'
  })
  @Transform((value) => value.obj.contractorId.toString())
  @Expose()
  public contractorId: string;

  @ApiProperty({
    description: 'The uniq task ID',
    example: 777
  })
  @Expose()
  public taskId: number;

  @ApiProperty({
    description: 'Review text',
    example: 'He did such a great job and were quick and efficient.'
  })
  @Expose()
  public reviewText: string;

  @ApiProperty({
    description: 'Review rating',
    example: 4
  })
  @Expose()
  public reviewRating: number;
}
