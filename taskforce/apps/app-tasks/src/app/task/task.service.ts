import * as dayjs from 'dayjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CommandEvent, CommentsCountUpdateType, TaskInterface } from '@taskforce/shared-types';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AddResponseDto } from './dto/add-response.dto';
import { formatTags } from '@taskforce/core';
import { TaskQuery } from './query/task.query';
import { DEADLINE_DATE_NOT_VALID, RABBITMQ_SERVICE } from './task.constant';
import { PersonalTasksQuery } from './query/personal-tasks.query';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}

  async createTask(dto: CreateTaskDto): Promise<TaskInterface> {
    if (dto.deadline) {
      if (dayjs().diff(dto.deadline, 'day') > 0) {
        throw new Error(DEADLINE_DATE_NOT_VALID);
      }
    }

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

  async getNewTasks(query: TaskQuery): Promise<TaskInterface[]> {
    const allTasks = await this.taskRepository.find(query);
    const newTasks = allTasks.filter((task) => task.status === 'New');

    return newTasks;
  }

  async getСustomerTasks(customerId: string, query: PersonalTasksQuery): Promise<TaskInterface[]> {
    return this.taskRepository.findCustomerTasks(customerId, query);
  }

  async getСontractorTasks(contractorId: string, query: PersonalTasksQuery): Promise<TaskInterface[]> {
    const contractorTasks = await this.taskRepository.findContractorTasks(contractorId, query);
    const newTasks = contractorTasks.filter((task) => task.status === 'New');
    const atWorkTasks = contractorTasks.filter((task) => task.status === 'AtWork');
    const completedTasks = contractorTasks.filter((task) => task.status === 'Completed');
    const failedTasks = contractorTasks.filter((task) => task.status === 'Failed');

    return [...newTasks, ...atWorkTasks, ...completedTasks, ...failedTasks];
  }

  async updateTask(id: number, dto: UpdateTaskDto): Promise<TaskInterface> {
    const taskBeforeUpdate = await this.taskRepository.findById(id);
    if (!taskBeforeUpdate) {
      throw new Error(`Task with id ${id}, does not exist`);
    }

    const taskEntity = new TaskEntity({
      ...taskBeforeUpdate,
      ...dto,
      tags: formatTags(dto?.tags)
    });

    return this.taskRepository.update(id, taskEntity);
  }

  async addResponse(id: number, dto: AddResponseDto): Promise<TaskInterface> {
    const taskBeforeUpdate = await this.taskRepository.findById(id);
    if (!taskBeforeUpdate) {
      throw new Error(`Task with id ${id}, does not exist`);
    }

    const taskEntity = new TaskEntity({
      ...taskBeforeUpdate,
      respondedUsers: [...taskBeforeUpdate.respondedUsers, dto.contractorId],
      responsesCount: taskBeforeUpdate.responsesCount + 1
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

  async changeCommentsCount(id: number, updateType: string): Promise<TaskInterface> {
    const taskBeforeUpdate = await this.taskRepository.findById(id);
    if (!taskBeforeUpdate) {
      throw new Error(`Task with id ${id}, does not exist`);
    }

    if (updateType === CommentsCountUpdateType.Increase) {
      const taskEntity = new TaskEntity({
        ...taskBeforeUpdate,
        commentsCount: taskBeforeUpdate.commentsCount + 1})

      return this.taskRepository.update(id, taskEntity)
    }

    if (updateType === CommentsCountUpdateType.Decrease) {
      const taskEntity = new TaskEntity({
        ...taskBeforeUpdate,
        commentsCount: taskBeforeUpdate.commentsCount - 1})

      return this.taskRepository.update(id, taskEntity)
    }
  }
}
