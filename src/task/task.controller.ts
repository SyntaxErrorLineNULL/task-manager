import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { TaskService } from './task.service';
import { CreateTaskRequest } from './request/create.task.request';
import { Task } from '../application/entity/task.entity';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getMessage(): string {
    return this.taskService.printMessage();
  }

  @Post('create')
  createTask(@Body() body: CreateTaskRequest): Promise<Task> {
    return this.taskService.createTask(body);
  }

  @Get('tasks')
  getAllTask(): Promise<Task[]> {
    return this.taskService.getAll();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getById(id);
  }
}
