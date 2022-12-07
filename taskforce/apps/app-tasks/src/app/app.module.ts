import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TaskModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
