import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@taskforce/core';
import { TaskInterface } from '@taskforce/shared-types';
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
      where: {id: Number(id)}
    });
  }

  public async find({limit, page, sortDirection, sortType, category, tags, city}: TaskQuery): Promise<TaskInterface[]> {
    if (sortType === 'createdAt') {
      if (category && city) {
        return this.prisma.task.findMany({
          where: {
            AND: [
              {category: category},
              {address: {contains: city}}
            ]
          },
          orderBy: [
            {createdAt: sortDirection},
          ],
          take: limit,
          skip: page > 0 ? limit * (page - 1) : undefined,
        });
      }

      if (category && tags) {
        return this.prisma.task.findMany({
          where: {
            AND: [
              {category: category},
              {tags: {hasSome: tags}}
            ]
          },
          orderBy: [
            {createdAt: sortDirection},
          ],
          take: limit,
          skip: page > 0 ? limit * (page - 1) : undefined,
        });
      }

      if (city && tags) {
        return this.prisma.task.findMany({
          where: {
            AND: [
              {address: {contains: city}},
              {tags: {hasSome: tags}}
            ]
          },
          orderBy: [
            {createdAt: sortDirection},
          ],
          take: limit,
          skip: page > 0 ? limit * (page - 1) : undefined,
        });
      }

      if (category && city && tags) {
        return this.prisma.task.findMany({
          where: {
            AND: [
              {category: category},
              {address: {contains: city}},
              {tags: {hasSome: tags}}
            ]
          },
          orderBy: [
            {createdAt: sortDirection},
          ],
          take: limit,
          skip: page > 0 ? limit * (page - 1) : undefined,
        });
      }

      if (category || city || tags) {
        return this.prisma.task.findMany({
          where: {
            OR: [
              {category: category},
              {address: {contains: city}},
              {tags: {hasSome: tags}}
            ]
          },
          orderBy: [
            {createdAt: sortDirection},
          ],
          take: limit,
          skip: page > 0 ? limit * (page - 1) : undefined,
        });
      }

      return this.prisma.task.findMany({
        orderBy: [
          {createdAt: sortDirection},
        ],
        take: limit,
        skip: page > 0 ? limit * (page - 1) : undefined,
      });
    }

    if (sortType === 'commentsCount') {
      if (category && city) {
        const tasks = await this.prisma.task.findMany({
          where: {
            AND: [
              {category: category},
              {address: {contains: city}}
            ]
          },
          take: limit,
          skip: page > 0 ? limit * (page - 1) : undefined,
        });

        if (sortDirection === 'asc') {
          return tasks.sort((taskA, taskB) => taskA.commentsCount - taskB.commentsCount);
        }

        return tasks.sort((taskA, taskB) => taskB.commentsCount - taskA.commentsCount);
      }

      if (category && tags) {
        const tasks = await this.prisma.task.findMany({
          where: {
            AND: [
              {category: category},
              {tags: {hasSome: tags}}
            ]
          },
          take: limit,
          skip: page > 0 ? limit * (page - 1) : undefined,
        });

        if (sortDirection === 'asc') {
          return tasks.sort((taskA, taskB) => taskA.commentsCount - taskB.commentsCount);
        }

        return tasks.sort((taskA, taskB) => taskB.commentsCount - taskA.commentsCount);
      }

      if (city && tags) {
        const tasks = await this.prisma.task.findMany({
          where: {
            AND: [
              {address: {contains: city}},
              {tags: {hasSome: tags}}
            ]
          },
          take: limit,
          skip: page > 0 ? limit * (page - 1) : undefined,
        });

        if (sortDirection === 'asc') {
          return tasks.sort((taskA, taskB) => taskA.commentsCount - taskB.commentsCount);
        }

        return tasks.sort((taskA, taskB) => taskB.commentsCount - taskA.commentsCount);
      }

      if (category && city && tags) {
        const tasks = await this.prisma.task.findMany({
          where: {
            AND: [
              {category: category},
              {address: {contains: city}},
              {tags: {hasSome: tags}}
            ]
          },
          take: limit,
          skip: page > 0 ? limit * (page - 1) : undefined,
        });

        if (sortDirection === 'asc') {
          return tasks.sort((taskA, taskB) => taskA.commentsCount - taskB.commentsCount);
        }

        return tasks.sort((taskA, taskB) => taskB.commentsCount - taskA.commentsCount);
      }

      if (category || city || tags) {
        const tasks = await this.prisma.task.findMany({
          where: {
            OR: [
              {category: category},
              {address: {contains: city}},
              {tags: {hasSome: tags}}
            ]
          },
          take: limit,
          skip: page > 0 ? limit * (page - 1) : undefined,
        });

        if (sortDirection === 'asc') {
          return tasks.sort((taskA, taskB) => taskA.commentsCount - taskB.commentsCount);
        }

        return tasks.sort((taskA, taskB) => taskB.commentsCount - taskA.commentsCount);
      }

      return this.prisma.task.findMany({
        orderBy: [
          {createdAt: sortDirection},
        ],
        take: limit,
        skip: page > 0 ? limit * (page - 1) : undefined,
      });
    }

    if (sortType === 'responsesCount') {
      if (category && city) {
        const tasks = await this.prisma.task.findMany({
          where: {
            AND: [
              {category: category},
              {address: {contains: city}}
            ]
          },
          take: limit,
          skip: page > 0 ? limit * (page - 1) : undefined,
        });

        if (sortDirection === 'asc') {
          return tasks.sort((taskA, taskB) => taskA.responsesCount - taskB.responsesCount);
        }

        return tasks.sort((taskA, taskB) => taskB.responsesCount - taskA.responsesCount);
      }

      if (category && tags) {
        const tasks = await this.prisma.task.findMany({
          where: {
            AND: [
              {category: category},
              {tags: {hasSome: tags}}
            ]
          },
          take: limit,
          skip: page > 0 ? limit * (page - 1) : undefined,
        });

        if (sortDirection === 'asc') {
          return tasks.sort((taskA, taskB) => taskA.responsesCount - taskB.responsesCount);
        }

        return tasks.sort((taskA, taskB) => taskB.responsesCount - taskA.responsesCount);
      }

      if (city && tags) {
        const tasks = await this.prisma.task.findMany({
          where: {
            AND: [
              {address: {contains: city}},
              {tags: {hasSome: tags}}
            ]
          },
          take: limit,
          skip: page > 0 ? limit * (page - 1) : undefined,
        });

        if (sortDirection === 'asc') {
          return tasks.sort((taskA, taskB) => taskA.responsesCount - taskB.responsesCount);
        }

        return tasks.sort((taskA, taskB) => taskB.responsesCount - taskA.responsesCount);
      }

      if (category && city && tags) {
        const tasks = await this.prisma.task.findMany({
          where: {
            AND: [
              {category: category},
              {address: {contains: city}},
              {tags: {hasSome: tags}}
            ]
          },
          take: limit,
          skip: page > 0 ? limit * (page - 1) : undefined,
        });

        if (sortDirection === 'asc') {
          return tasks.sort((taskA, taskB) => taskA.responsesCount - taskB.responsesCount);
        }

        return tasks.sort((taskA, taskB) => taskB.responsesCount - taskA.responsesCount);
      }

      if (category || city || tags) {
        const tasks = await this.prisma.task.findMany({
          where: {
            OR: [
              {category: category},
              {address: {contains: city}},
              {tags: {hasSome: tags}}
            ]
          },
          take: limit,
          skip: page > 0 ? limit * (page - 1) : undefined,
        });

        if (sortDirection === 'asc') {
          return tasks.sort((taskA, taskB) => taskA.responsesCount - taskB.responsesCount);
        }

        return tasks.sort((taskA, taskB) => taskB.responsesCount - taskA.responsesCount);
      }

      const tasks = await this.prisma.task.findMany({
        take: limit,
        skip: page > 0 ? limit * (page - 1) : undefined,
      });

      if (sortDirection === 'asc') {
        return tasks.sort((taskA, taskB) => taskA.responsesCount - taskB.responsesCount);
      }

      return tasks.sort((taskA, taskB) => taskB.responsesCount - taskA.responsesCount);
    }
  }

  public async findNewTasks() {
    return this.prisma.task.findMany({
      where: {status: 'New'},
      select: {title: true}
    });
  }

  public async update(id: number, item: TaskEntity): Promise<TaskInterface> {
    return this.prisma.task.update({
      where: {id: Number(id)},
      data: {...item}
    })
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.task.delete({
      where: {id}
    });
  }
}
