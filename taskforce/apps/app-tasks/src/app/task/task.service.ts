import { Injectable } from '@nestjs/common';
import { TaskInterface } from '@taskforce/shared-types';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { formatTegs } from '@taskforce/core';
import { TaskQuery } from './query/task.query';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(dto: CreateTaskDto): Promise<TaskInterface> {
    const taskEntity = new TaskEntity({
      ...dto,
      status: "New",
      tegs: formatTegs(dto?.tegs)
    });
    return this.taskRepository.create(taskEntity);
  }

  async getTask(id: number): Promise<TaskInterface> {
    return this.taskRepository.findById(id);
  }

  async getTasks(query: TaskQuery): Promise<TaskInterface[]> {
    return this.taskRepository.find(query);
  }

  async updateTask(id: number, dto: UpdateTaskDto, {updateType}: {updateType: string}): Promise<TaskInterface> {
    const taskBeforeUpdate = await this.taskRepository.findById(id);
    if (!taskBeforeUpdate) {
      throw new Error(`Task with id ${id}, does not exist`);
    }

    if (updateType === 'incCommentsCount') {
      const taskEntity = new TaskEntity({
        ...taskBeforeUpdate,
        ...dto,
        commentsCount: taskBeforeUpdate.commentsCount + 1})

      return this.taskRepository.update(id, taskEntity)
    }

    if (updateType === 'decCommentsCount') {
      const taskEntity = new TaskEntity({
        ...taskBeforeUpdate,
        ...dto,
        commentsCount: taskBeforeUpdate.commentsCount - 1})

      return this.taskRepository.update(id, taskEntity)
    }

    if (updateType === 'incResponsesCount') {
      const taskEntity = new TaskEntity({
        ...taskBeforeUpdate,
        ...dto,
        responsesCount: taskBeforeUpdate.responsesCount + 1})

      return this.taskRepository.update(id, taskEntity)
    }

    const taskEntity = new TaskEntity({
      ...taskBeforeUpdate,
      ...dto,
      tegs: formatTegs(dto?.tegs)
    });

    return this.taskRepository.update(id, taskEntity);
  }

  async deleteTask(id: number): Promise<void> {
    this.taskRepository.delete(id);
  }
}
