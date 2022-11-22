import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CommentRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '42d448f8-9111-4ad7-ac70-2b6dd34af25'
  })
  @Expose({name: '_id'})
  public id: string

  @ApiProperty({
    description: 'The uniq task ID',
    example: '24b448c8-9111-4da7-ca70-2b6dd34af52'
  })
  @Expose()
  taskId: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'Однажды в студённую зимнюю пору, я из лесу вышел, был сильный мороз.'
  })
  @Expose()
  text: string;
}
