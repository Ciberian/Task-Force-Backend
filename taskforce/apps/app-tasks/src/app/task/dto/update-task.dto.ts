import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Создать работающий экземпляр термоядерной установки'
  })
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Для ядерного синтеза допускается использование дейтерия и трития, или же изотопа гелия — гелий-3'
  })
  public description: string;

  @ApiProperty({
    description: 'Task category',
    example: 'Очумелые ручки'
  })
  public category: string;

  @ApiProperty({
    description: 'Task price',
    example: '100500'
  })
  public price?: string;

  @ApiProperty({
    description: 'Task deadline',
    example: '2022-12-22'
  })
  public deadline?: Date;

  @ApiProperty({
    description: 'Task image',
    example: 'ITER.png'
  })
  public image?: string;

  @ApiProperty({
    description: 'Task address',
    example: 'Москва, Кремль, дом 1'
  })
  public address?: string;

  @ApiProperty({
    description: 'Task tegs',
    example: 'Изичная задача, Задача на раз плюнуть'
  })
  public tegs?: string[];

  @ApiProperty({
    description: 'User Id',
    example: '6385aaacc05cd5e757d37764'
  })
  public userId: string;
}
