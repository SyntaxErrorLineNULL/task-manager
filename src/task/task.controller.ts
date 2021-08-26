import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskRequest } from './request/create.task.request';
import { Task } from '../application/entity/task.entity';
import { v4 as uuidv4 } from 'uuid';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getMessage(): string {
    return this.taskService.printMessage();
  }

  @Post('create')
  getRequestProperty(@Body() body: CreateTaskRequest) {
    const task = new Task(uuidv4(), body.title, body.description);
    this.taskService.createTask(task);
    return 'Ok';
  }
}
