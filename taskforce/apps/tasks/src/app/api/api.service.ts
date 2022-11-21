import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskInterface, TaskStatus } from '@taskforce/shared-types';
import { TaskMemoryRepository } from '../task/task-memory.repository';
import { TaskEntity } from '../task/task.entity';

const TASKS_COUNT = 25;

@Injectable()
export class ApiService {
  constructor(private readonly taskMemoryRepository: TaskMemoryRepository) {}

  async create(dto: CreateTaskDto) {
    const {title, description, category} = dto;
    const task: TaskInterface = {
      _id: '',
      title,
      description,
      category,
      price: dto?.price || '',
      deadline: dto?.deadline,
      image: dto?.image || '',
      address: dto?.address || '',
      tegs: dto?.tegs || [],
      status: TaskStatus.New,
    };

    const taskEntity = new TaskEntity(task);

    return this.taskMemoryRepository.create(taskEntity);
  }

  async getTasks() {
    const allTasks = await this.taskMemoryRepository.find();
    
    return allTasks
      .filter((task) => task.status === TaskStatus.New)
      .slice(0, TASKS_COUNT);
  }

  async getTask(id: string) {
    return this.taskMemoryRepository.findById(id);
  }

  async updateTask(id: string, dto: UpdateTaskDto) {
    const oldTask = await this.taskMemoryRepository.findById(id);
    const updatedTask = {...oldTask, ...dto};
    const taskEntity = new TaskEntity(updatedTask)

    return this.taskMemoryRepository.update(id, taskEntity);
  }

  async deleteTask(id: string) {
    return this.taskMemoryRepository.delete(id);
  }
}

