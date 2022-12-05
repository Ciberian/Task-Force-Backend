import { Module } from '@nestjs/common';
import { TaskCategoryService } from './task-category.service';
import { TaskCategoryRepository } from './task-category.repository';
import { TaskCategoryController } from './task-category.controller';

@Module({
  imports: [],
  controllers: [TaskCategoryController],
  providers: [TaskCategoryService, TaskCategoryRepository],
  exports: [TaskCategoryRepository]
})
export class TaskCategoryModule {}
