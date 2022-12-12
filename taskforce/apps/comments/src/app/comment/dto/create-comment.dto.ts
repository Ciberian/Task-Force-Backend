import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'Однажды в студённую зимнюю пору, я из лесу вышел, был сильный мороз.'
  })
  @IsString()
  @Length(10, 300, {message: 'Comment min length is 10, max is 300'})
  text: string;
}
