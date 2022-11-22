import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'Однажды в студённую зимнюю пору, я из лесу вышел, был сильный мороз.'
  })
  text: string;
}
