import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsMongoId,
  IsISO8601,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEnum,
  IsArray,
  Length,
  IsNumber,
  Min,
  ArrayMaxSize,
} from 'class-validator';
import {
  TASK_TITLE_NOT_VALID,
  TASK_DESCRIPTION_NOT_VALID,
  DEADLINE_DATE_NOT_VALID,
  TEGS_NOT_VALID,
  MAX_TEGS_COUNT,
  MIN_TEG_LENGTH,
  MAX_TEG_LENGTH,
  TEGS_СONTAIN_INVALID_SIMBOLS
} from '../task.constant';

enum TaskStatus {
  New = "New",
  Cancelled = "Cancelled",
  AtWork = "AtWork",
  Completed = "Completed",
  Failed = "Failed"
}

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Создать работающий экземпляр термоядерной установки'
  })
  @IsOptional()
  @IsString()
  @Matches(/\S/)
  @Length(20, 50, {message: TASK_TITLE_NOT_VALID})
  public title?: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Для ядерного синтеза допускается использование дейтерия и трития, или же изотопа гелия — гелий-3'
  })
  @IsOptional()
  @IsString()
  @Matches(/\S/)
  @Length(100, 1024, {message: TASK_DESCRIPTION_NOT_VALID})
  public description?: string;

  @ApiProperty({
    description: 'Task category',
    example: 'Очумелые ручки'
  })
  @IsOptional()
  @IsString()
  @Matches(/\S/)
  public category?: string;

  @ApiProperty({
    description: 'Task price',
    example: '100500'
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  public price?: number;

  @ApiProperty({
    description: 'Task deadline',
    example: '2022-12-22'
  })
  @IsOptional()
  @IsISO8601({message: DEADLINE_DATE_NOT_VALID})
  public deadline?: string;

  @ApiProperty({
    description: 'Task image',
    example: 'ITER.png'
  })
  @IsOptional()
  @IsString()
  public image?: string;

  @ApiProperty({
    description: 'Task address',
    example: 'Москва, Кремль, дом 1'
  })
  @IsOptional()
  @IsString()
  public address?: string;

  @ApiProperty({
    description: 'Task tegs',
    example: 'Изичная задача, Задача на раз плюнуть',
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(MAX_TEGS_COUNT)
  @MinLength(MIN_TEG_LENGTH, {each: true})
  @MaxLength(MAX_TEG_LENGTH, {each: true})
  @IsString({each: true, message: TEGS_NOT_VALID})
  @Matches(/^[a-zа-яё][a-zа-яё0-9-]+$/i, {each: true, message: TEGS_СONTAIN_INVALID_SIMBOLS})
  public tegs?: string[];

  @ApiProperty({
    description: 'Task status',
    example: 'New'
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  public status?: TaskStatus;

  @ApiProperty({
    description: 'The uniq user ID',
    example: '6385aaacc05cd5e757d37764'
  })
  @IsOptional()
  @IsMongoId()
  public userId: string;
}
