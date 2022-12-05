import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@taskforce/shared-types';

export class TaskRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '42d448f8-9111-4ad7-ac70-2b6dd34af25'
  })
  @Expose({name: '_id'})
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
    description: 'Task tegs',
    example: 'Изичная задача, Задача на раз плюнуть'
  })
  @Expose()
  public tegs: string;

  @ApiProperty({
    description: 'Task status',
    example: 'Провалено'
  })
  @Expose()
  public status: TaskStatus;

  @ApiProperty({
    description: 'User Id',
    example: '6385aaacc05cd5e757d37764'
  })
  public userId: string;
}
