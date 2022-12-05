import { CRUDRepositoryInterface } from '@taskforce/core';
import { TaskCategoryEntity } from './task-category.entity';
import { CategoryInterface } from '@taskforce/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskCategoryRepository implements CRUDRepositoryInterface<TaskCategoryEntity, number, CategoryInterface> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskCategoryEntity): Promise<CategoryInterface> {
    return this.prisma.category.create({
      data: { ...item.toObject() }
    });
  }

  public findById(id: number): Promise<CategoryInterface | null> {
    return this.prisma.category.findFirst({
      where: {
        id
      }
    });
  }

  public find(ids: number[] = []): Promise<CategoryInterface[]> {
    return this.prisma.category.findMany({
      where: {
        id: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
  }

  public update(id: number, item: TaskCategoryEntity): Promise<CategoryInterface> {
    return this.prisma.category.update({
      where: {
        id
      },
      data: { ...item.toObject(), id}
    });
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.category.delete({
      where: {
       id,
      }
    });
  }
}
