import { TaskInterface, TaskStatus } from '@taskforce/shared-types';

export class TaskEntity implements TaskInterface {
  public title: string;
  public description: string;
  public category: string;
  public price?: string;
  public deadline?: string;
  public image?: string;
  public address?: string;
  public tegs?: string[];
  public status: TaskStatus;
  public userId: string;

  constructor(task: TaskInterface) {
    this.fillEntity(task);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(task: TaskInterface) {
    this.title = task.title;
    this.description = task.description;
    this.category = task.category;
    this.price = task.price;
    this.deadline = task.deadline;
    this.image = task?.image;
    this.address = task.address;
    this.tegs = task.tegs;
    this.status = task.status;
    this.userId = task.userId;
  }
}
