import { TaskInterface, TaskStatus } from '@taskforce/shared-types';

export class TaskEntity implements TaskInterface {
  public title: string;
  public description: string;
  public category: string;
  public price?: number;
  public deadline?: string;
  public image?: string;
  public address?: string;
  public tags?: string[];
  public status: TaskStatus;
  public customerId: string;
  public contractorId?: string;
  public respondedUsers?: string[];
  public responsesCount: number;
  public commentsCount: number;

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
    this.tags = task.tags;
    this.status = task.status;
    this.customerId = task.customerId;
    this.contractorId = task.contractorId;
    this.respondedUsers = task.respondedUsers;
    this.responsesCount = task.responsesCount;
    this.commentsCount = task.commentsCount;
  }
}
