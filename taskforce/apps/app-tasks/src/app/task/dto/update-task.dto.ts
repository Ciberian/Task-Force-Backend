import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
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
import { TaskValidationMessage, Tag, TaskStatus } from '../task.constant';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Создать работающий экземпляр термоядерной установки'
  })
  @IsOptional()
  @IsString()
  @Matches(/\S/)
  @Length(20, 50, {message: TaskValidationMessage.TitleNotValid})
  public title?: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Для ядерного синтеза допускается использование дейтерия и трития, или же изотопа гелия — гелий-3'
  })
  @IsOptional()
  @IsString()
  @Matches(/\S/)
  @Length(100, 1024, {message: TaskValidationMessage.DescriptionNotValid})
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
  @IsISO8601({message: TaskValidationMessage.DeadlineDateNotValid})
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
    description: 'Task tags',
    example: 'Изичная задача, Задача на раз плюнуть',
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(Tag.MaxCount)
  @MinLength(Tag.MinLength, {each: true})
  @MaxLength(Tag.MaxLength, {each: true})
  @IsString({each: true, message: TaskValidationMessage.TagsNotValid})
  @Matches(/^[a-zа-яё][a-zа-яё0-9-]+$/i, {each: true, message: TaskValidationMessage.TagsContainInvalidSymbols})
  public tags?: string[];

  @ApiProperty({
    description: 'Task status',
    example: 'New'
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  public status?: TaskStatus;
}
