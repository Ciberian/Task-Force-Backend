import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@taskforce/core';
import { City, TaskInterface } from '@taskforce/shared-types';
import { TaskEntity } from './task.entity';
import { TaskQuery } from './query/task.query';

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

  // WIP: Тут нужно будет как-то реализовать сортировку по условию, взависимости от значения sortType:
  // т.е. по дате создания(createdAt), или по количеству комментариев (commentIds), или по количеству отзывов (responses)
  // Пока сортировка всегда выполняется по полю createdAt
  public find({limit, page, sortDirection, sortType, category, tegs, city = City.Moscow}: TaskQuery): Promise<TaskInterface[]> {
    return this.prisma.task.findMany({
      where: {
        OR: [
          {category: category},
          {address: {contains: city}},
          {tegs: {hasSome: tegs}}
        ]
      },
      orderBy: [
        {createdAt: sortDirection},
      ],
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
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
