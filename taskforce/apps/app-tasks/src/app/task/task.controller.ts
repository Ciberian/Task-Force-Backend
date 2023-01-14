import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Body,
  Patch,
  Post,
  ParseIntPipe,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { diskStorage } from 'multer';
import { TaskService } from './task.service';
import { TaskRdo } from './rdo/task.rdo';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { NotifyUserDto } from './dto/notify-user.dto';
import { UpdateCommentsCountDto } from './dto/update-comments-count.dto';
import { CommandEvent } from '@taskforce/shared-types';
import { fillDTO } from '@taskforce/core';
import { TaskQuery } from './query/task.query';
import { IMAGE_FILE_MAX_SIZE, IMAGE_FILE_TYPE } from './task.constant';

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

  @Post('/:id/image')
  @UseInterceptors(FileInterceptor('image', {storage: diskStorage({destination: './task-images'})}))
  public async uploadeAvatar(
    @Param('id') taskId: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({maxSize: IMAGE_FILE_MAX_SIZE}),
          new FileTypeValidator({fileType: IMAGE_FILE_TYPE}),
        ],
      })
    )
    file: Express.Multer.File) {
      const response = {
        originalname: file.originalname,
        filename: file.filename,
      };

      await this.taskService.updateTask(taskId, {image: response.filename})

      return {
        status: HttpStatus.OK,
        message: 'Image for task uploaded successfully!',
        data: response,
      };
    }

  @EventPattern({cmd: CommandEvent.ChangeCommentsCount})
  public async changeCommentsCountField(dto: UpdateCommentsCountDto) {
    return this.taskService.changeCommentsCount(dto.id, dto.updateType);
  }
}
