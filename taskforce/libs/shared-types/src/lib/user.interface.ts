import { City } from './city.enum';
import { UserRole } from './user-role.enum';

export interface UserInterface {
  _id?: string;
  name: string;
  email: string;
  city: City;
  passwordHash: string;
  role: UserRole;
  avatar?: string;
  birthDate: Date;
  age?: number;
  registrationDate?: string;
  personalInfo?: string;
  createdTasks?: number;
  newTasks?: number;
  specialization?: string[];
  rank?: number;
  rating?: number;
  failedTasksCount?: number;
  completedTasksCount?: number;
}
