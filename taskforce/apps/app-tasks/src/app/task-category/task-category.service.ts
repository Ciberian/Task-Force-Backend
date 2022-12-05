import { Injectable } from '@nestjs/common';
import { CategoryInterface } from '@taskforce/shared-types';
import { TaskCategoryEntity } from './task-category.entity';
import { TaskCategoryRepository } from './task-category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class TaskCategoryService {
  constructor(
    private readonly taskCategoryRepository: TaskCategoryRepository
  ) {}

  async createCategory(dto: CreateCategoryDto): Promise<CategoryInterface> {
    const categoryEntity = new TaskCategoryEntity(dto);
    return this.taskCategoryRepository.create(categoryEntity);
  }

  async deleteCategory(id: number): Promise<void> {
    this.taskCategoryRepository.delete(id);
  }

  async getCategory(id: number): Promise<CategoryInterface> {
    return this.taskCategoryRepository.findById(id);
  }

  async getCategories(): Promise<CategoryInterface[]> {
    return this.taskCategoryRepository.find();
  }

  async updateCategory(id: number, dto: UpdateCategoryDto): Promise<CategoryInterface> {
    return this.taskCategoryRepository.update(id, new TaskCategoryEntity(dto));
  }
}
