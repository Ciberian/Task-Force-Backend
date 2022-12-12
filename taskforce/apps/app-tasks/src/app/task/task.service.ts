import { Injectable } from '@nestjs/common';
import { TaskInterface } from '@taskforce/shared-types';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(dto: CreateTaskDto): Promise<TaskInterface> {
    const taskEntity = new TaskEntity({...dto, status: "New"});
    return this.taskRepository.create(taskEntity);
  }

  async getTask(id: number): Promise<TaskInterface> {
    return this.taskRepository.findById(id);
  }

  async getTasks(): Promise<TaskInterface[]> {
    return this.taskRepository.find();
  }

  async updateTask(id: number, dto: UpdateTaskDto): Promise<TaskInterface> {
    const taskBeforeUpdate = await this.taskRepository.findById(id);
    if (!taskBeforeUpdate) {
      throw new Error(`Task with id ${id}, does not exist`);
    }

    const taskEntity = new TaskEntity({...taskBeforeUpdate, ...dto});
    return this.taskRepository.update(id, taskEntity);
  }

  async deleteTask(id: number): Promise<void> {
    this.taskRepository.delete(id);
  }
}
