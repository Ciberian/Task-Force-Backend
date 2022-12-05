import { TaskStatus } from './task-status.enum';

export interface TaskInterface {
  _id: string;
  title: string;
  description: string;
  category: string;
  price?: string;
  deadline?: Date;
  image?: string;
  address?: string;
  tegs?: string[];
  status: TaskStatus;
  userId: string;
}
