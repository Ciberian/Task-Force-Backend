import { Controller, Post, Get, Patch, Delete, Body, Param, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { fillDTO } from '@taskforce/core';
import { TaskRdo } from './rdo/task.rdo';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiService } from './api.service';

@ApiTags('tasks')
@Controller('tasks')
export class ApiController {

  constructor(private readonly apiService: ApiService) {}

  @Post()
  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The new task has been successfully created.'
  })
  async create(@Body() dto: CreateTaskDto) {
    const newTask = await this.apiService.create(dto);
    return fillDTO(TaskRdo, newTask);
  }

  @Get()
  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'The tasks were successfully received'
  })
  async showTasks() {
    const tasks = await this.apiService.getTasks();
    return fillDTO(TaskRdo, tasks);
  }

  @Get(':id')
  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'The task were successfully received'
  })
  async show(@Param('id') id: string) {
    const existTask = await this.apiService.getTask(id);
    return fillDTO(TaskRdo, existTask);
  }

  @Patch(':id')
  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'The tasks were successfully received'
  })
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    const updatedTask = await this.apiService.updateTask(id, dto);
    return fillDTO(TaskRdo, updatedTask);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The task were successfully deleted'
  })
  async delete(@Param('id') id: string) {
    await this.apiService.deleteTask(id);
    return `Task with id - ${id}, has been deleted.`
  }
}

