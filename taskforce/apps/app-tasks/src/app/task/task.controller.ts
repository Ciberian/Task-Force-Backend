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
import { CommandEvent, UserRole } from '@taskforce/shared-types';
import { fillDTO } from '@taskforce/core';
import { TaskQuery } from './query/task.query';
import { IMAGE_FILE_MAX_SIZE, IMAGE_FILE_TYPE } from './task.constant';
import { GetPersonalTasksDto } from './dto/get-personal-tasks.dto';
import { PersonalTasksQuery } from './query/personal-tasks.query';
import { AddResponseDto } from './dto/add-response.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

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

  @Get('/')
  public async index(@Query() query: TaskQuery) {
    const tasks = await this.taskService.getTasks(query);
    return fillDTO(TaskRdo, tasks);
  }

  @Get('/new')
  public async showNewTasks(@Query() query: TaskQuery) {
    const tasks = await this.taskService.getNewTasks(query);
    return fillDTO(TaskRdo, tasks);
  }

  @Get('/personal')
  async showPersonal(@Query() query: PersonalTasksQuery, @Body() dto: GetPersonalTasksDto) {
    const {userId, userRole} = dto;

    if (userRole === UserRole.Contractor) {
      const personalTasks = await this.taskService.getСontractorTasks(userId, query);
      return fillDTO(TaskRdo, personalTasks);
    }

    const personalTasks = await this.taskService.getСustomerTasks(userId, query);
    return fillDTO(TaskRdo, personalTasks);
  }

  @Get('/:id')
  public async show(@Param('id', ParseIntPipe) id: number) {
    const task = await this.taskService.getTask(id);
    return fillDTO(TaskRdo, task);
  }

  @Patch('/:id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto
  ) {
    const updatedTask = await this.taskService.updateTask(id, dto);
    return fillDTO(TaskRdo, updatedTask);
  }

  @Patch('/:id/status')
  public async changeTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskStatusDto
  ) {
    const updatedTask = await this.taskService.updateTaskStatus(id, dto);
    return fillDTO(TaskRdo, updatedTask);
  }

  @Patch('/:id/response')
  public async addNewResponse(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddResponseDto
  ) {
    const updatedTask = await this.taskService.addResponse(id, dto);
    return fillDTO(TaskRdo, updatedTask);
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
