import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CommentRdo {
  @ApiProperty({
    description: 'The uniq comment ID',
    example: '638e291cd88ef99f1bf241bb'
  })
  @Transform((value) => value.obj._id.toString())
  @Expose({name: '_id'})
  public id: string

  @ApiProperty({
    description: 'The uniq task ID',
    example: '638589d7798f4804ac8ecfd0'
  })
  @Expose()
  taskId: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'Однажды в студённую зимнюю пору, я из лесу вышел, был сильный мороз.'
  })
  @Expose()
  text: string;

  @ApiProperty({
    description: 'Comment created date',
    example: '2022-12-05T17:23:40.400Z'
  })
  @Expose()
  createdAt: string;
}
