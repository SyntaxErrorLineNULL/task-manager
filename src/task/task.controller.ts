import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskRequest } from './request/CreateTaskRequest';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getMessage(): string {
    return this.taskService.printMessage();
  }

  @Post('create')
  getRequestProperty(@Body() body: CreateTaskRequest) {
    return body.title;
  }
}
