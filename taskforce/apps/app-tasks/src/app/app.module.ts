import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TaskCategoryModule } from './task-category/task-category.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TaskModule, PrismaModule, TaskCategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
