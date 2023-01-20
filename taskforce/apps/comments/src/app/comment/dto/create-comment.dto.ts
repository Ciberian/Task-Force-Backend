import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';
import { CommentValidationMessage } from '../comments.constant';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    example:
      'Однажды в студённую зимнюю пору, я из лесу вышел, был сильный мороз.',
  })
  @IsString()
  @Matches(/\S/)
  @Length(10, 300, {message: CommentValidationMessage.CommentLengthNotValid})
  text: string;
}
