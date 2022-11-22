import { Module } from '@nestjs/common';
import { TaskModule } from '../task/task.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [TaskModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
