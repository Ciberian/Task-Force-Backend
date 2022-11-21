import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { fillDTO } from '@taskforce/core';
import { TaskRdo } from './rdo/task.rdo';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiService } from './api.service';

@Controller('tasks')
export class ApiController {

  constructor(private readonly apiService: ApiService) {}

  @Post()
  async create(@Body() dto: CreateTaskDto) {
    const newTask = await this.apiService.create(dto);
    return fillDTO(TaskRdo, newTask);
  }

  @Get()
  async showTasks() {
    const tasks = await this.apiService.getTasks();
    return fillDTO(TaskRdo, tasks);
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    const existTask = await this.apiService.getTask(id);
    return fillDTO(TaskRdo, existTask);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    const updatedTask = await this.apiService.updateTask(id, dto);
    return fillDTO(TaskRdo, updatedTask);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.apiService.deleteTask(id);
    return `Task with id - ${id}, has been deleted.`
  }
}

