import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CommandEvent, TaskInterface } from '@taskforce/shared-types';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { formatTags } from '@taskforce/core';
import { TaskQuery } from './query/task.query';
import { RABBITMQ_SERVICE } from './task.constant';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}

  async createTask(dto: CreateTaskDto): Promise<TaskInterface> {
    const taskEntity = new TaskEntity({
      ...dto,
      status: "New",
      tags: formatTags(dto?.tags)
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
      tags: formatTags(dto?.tags)
    });

    return this.taskRepository.update(id, taskEntity);
  }

  async deleteTask(id: number): Promise<void> {
    this.taskRepository.delete(id);
  }

  async notify(email: string): Promise<void> {
    const newTasks = await this.taskRepository.findNewTasks();
    const tasksTitle = newTasks.map((task) => task.title);

    this.rabbitClient.emit(
      {
        cmd: CommandEvent.SendNewTasks
      },
      {
        email: email,
        titles: tasksTitle
      }
    );
  }
}
