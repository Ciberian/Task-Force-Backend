import { City } from '@taskforce/shared-types';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { DEFAULT_TASK_COUNT_LIMIT, DEFAULT_SORT_DIRECTION, DEFAULT_SORT_TYPE, DEFAULT_PAGE } from '../task.constant';

export class TaskQuery {
  @Transform(({value}) => +value || DEFAULT_TASK_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_TASK_COUNT_LIMIT;

  @Transform(({value}) => +value)
  @IsNumber()
  @IsOptional()
  public page: number = DEFAULT_PAGE;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @IsString()
  @IsOptional()
  public sortType?: 'createdAt' | 'commentIds' | 'responses' = DEFAULT_SORT_TYPE;

  @IsString()
  @IsOptional()
  public category?: string;

  @Transform(({value}) => value.split(',').map((teg) => teg))
  @IsArray({})
  @IsOptional()
  public tegs?: string[];

  @IsEnum(City)
  @IsOptional()
  public city?: City;
}
