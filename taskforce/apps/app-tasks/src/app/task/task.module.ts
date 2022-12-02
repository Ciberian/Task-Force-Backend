import { Module } from '@nestjs/common';
import { TaskMemoryRepository } from './task-memory.repository';

@Module({
  imports: [],
  providers: [TaskMemoryRepository],
  exports: [TaskMemoryRepository],
})
export class TaskModule {}
