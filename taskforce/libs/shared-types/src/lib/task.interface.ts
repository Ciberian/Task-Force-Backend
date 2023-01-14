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
  tags?: string[];
  status: TaskStatus;
  customerId: string;
  contractorId?: string;
  respondedUsers?: string[];
  responsesCount?: number;
  commentsCount?: number;
}
