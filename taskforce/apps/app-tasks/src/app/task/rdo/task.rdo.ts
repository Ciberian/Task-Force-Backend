import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@taskforce/shared-types';

export class TaskRdo {
  @ApiProperty({
    description: 'The uniq task ID',
    example: '6385aaacc05cd5e757d37764'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Task title',
    example: 'Создать работающий экземпляр термоядерной установки'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Для ядерного синтеза допускается использование дейтерия и трития, или же изотопа гелия — гелий-3'
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Task category',
    example: 'Очумелые ручки'
  })
  @Expose()
  public category: string;

  @ApiProperty({
    description: 'Task price',
    example: '100500'
  })
  @Expose()
  public price: string;

  @ApiProperty({
    description: 'Task deadline',
    example: '2022-12-22'
  })
  @Expose()
  public deadline: string;

  @ApiProperty({
    description: 'Task image',
    example: 'ITER.png'
  })
  @Expose()
  public image: string;

  @ApiProperty({
    description: 'Task address',
    example: 'Москва, Кремль, дом 1'
  })
  @Expose()
  public address: string;

  @ApiProperty({
    description: 'Task tags',
    example: ['перевозки']
  })
  @Expose()
  public tags: string[];

  @ApiProperty({
    description: 'Task status',
    example: 'Failed'
  })
  @Expose()
  public status: TaskStatus;

  @ApiProperty({
    description: 'The uniq user ID',
    example: '6385aaacc05cd5e757d37764'
  })
  public userId: string;

  @ApiProperty({
    description: 'Task created date',
    example: '2022-12-22'
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Временное решение, для проверки сортировки.',
    example: 100500
  })
  @Expose()
  public commentsCount: number;

  @ApiProperty({
    description: 'Временное решение, для проверки сортировки.',
    example: 100500
  })
  @Expose()
  public responsesCount: number;
}
