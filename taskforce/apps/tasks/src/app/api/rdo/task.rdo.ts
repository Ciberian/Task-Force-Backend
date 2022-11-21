import { Expose } from 'class-transformer';
import { TaskStatus } from '@taskforce/shared-types';

export class TaskRdo {
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public category: string;

  @Expose()
  public price: string;

  @Expose()
  public deadline: string;

  @Expose()
  public image: string;

  @Expose()
  public address: string;

  @Expose()
  public tegs: string;

  @Expose()
  public status: TaskStatus;
}
