import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Query, Body, Patch, Post, ParseIntPipe } from '@nestjs/common';
import { fillDTO } from '@taskforce/core';
import { TaskService } from './task.service';
import { TaskRdo } from './rdo/task.rdo';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { NotifyUserDto } from './dto/notify-user.dto';
import { TaskQuery } from './query/task.query';
import { EventPattern } from '@nestjs/microservices';
import { CommandEvent } from '@taskforce/shared-types';
import { UpdateCommentsCountDto } from './dto/update-comments-count.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/notify')
  public async notifyUser(@Body() dto: NotifyUserDto) {
    this.taskService.notify(dto.email);
  }

  @Post('/')
  public async create(@Body() dto: CreateTaskDto) {
    const newTask = await this.taskService.createTask(dto);
    return fillDTO(TaskRdo, newTask);
  }

  @Get('/:id')
  public async show(@Param('id', ParseIntPipe) id: number) {
    const task = await this.taskService.getTask(id);
    return fillDTO(TaskRdo, task);
  }

  @Get('/')
  public async index(@Query() query: TaskQuery) {
    const tasks = await this.taskService.getTasks(query);
    return fillDTO(TaskRdo, tasks);
  }

  @Patch('/:id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto
  ) {
    const updatedTask = await this.taskService.updateTask(id, dto);
    return fillDTO(TaskRdo, updatedTask)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id', ParseIntPipe) id: number) {
    this.taskService.deleteTask(id);
  }

  @EventPattern({cmd: CommandEvent.ChangeCommentsCount})
  public async changeCommentsCountField(dto: UpdateCommentsCountDto) {
    return this.taskService.changeCommentsCount(dto.id, dto.updateType);
  }
}
