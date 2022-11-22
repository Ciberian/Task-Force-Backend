import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [ApiModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
