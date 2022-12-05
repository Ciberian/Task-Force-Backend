import { CategoryInterface } from '@taskforce/shared-types';
import { Entity } from '@taskforce/core';

export class TaskCategoryEntity implements Entity<TaskCategoryEntity>, CategoryInterface {
  public id: number;
  public title: string;

  constructor(category: CategoryInterface) {
    this.fillEntity(category);
  }

  public fillEntity(entity: CategoryInterface) {
    this.id = entity.id;
    this.title = entity.title;
  }

  public toObject(): TaskCategoryEntity {
    return {...this}
  }
}
