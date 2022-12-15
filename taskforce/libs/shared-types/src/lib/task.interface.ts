import { TaskStatus } from './task-status.enum';

export interface TaskInterface {
  id?: number;
  title: string;
  description: string;
  category: string;
  price?: number;
  deadline?: string;
  image?: string;
  address?: string;
  tegs?: string[];
  status: TaskStatus;
  userId: string;
  commentsCount?: number;
  responsesCount?: number;
}
