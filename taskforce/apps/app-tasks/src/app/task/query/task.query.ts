import { City } from '@taskforce/shared-types';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { DEFAULT_PAGE, Task } from '../task.constant';

export class TaskQuery {
  @Transform(({value}) => +value || Task.DefaultCountLimit)
  @IsNumber()
  @IsOptional()
  public limit = Task.DefaultCountLimit;

  @Transform(({value}) => +value || DEFAULT_PAGE)
  @IsNumber()
  @IsOptional()
  public page?: number = DEFAULT_PAGE;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = Task.DefaultSortDirection;

  @IsString()
  @IsOptional()
  public sortType?: 'createdAt' | 'commentsCount' | 'responsesCount' = Task.DefaultSortType;

  @IsString()
  @IsOptional()
  public category?: string;

  @Transform(({value}) => value.split(',').map((tag) => tag))
  @IsArray({})
  @IsOptional()
  public tags?: string[];

  @IsEnum(City)
  @IsOptional()
  public city?: City;
}
