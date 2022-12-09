import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@taskforce/core';
import { TaskInterface } from '@taskforce/shared-types';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskRepository implements CRUDRepositoryInterface<TaskEntity, number, TaskInterface> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskEntity): Promise<TaskInterface> {
    return this.prisma.task.create({
      data: {...item.toObject()}
    });
  }

  public async findById(id: number): Promise<TaskInterface | null> {
    return this.prisma.task.findFirst({
      where: {id}
    });
  }

  public find(): Promise<TaskInterface[]> {
    return this.prisma.task.findMany({});
  }

  public update(id: number, item: TaskEntity): Promise<TaskInterface> {
    return this.prisma.task.update({
      where: {id},
      data: {...item}
    })
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.task.delete({
      where: {id}
    });
  }
}
