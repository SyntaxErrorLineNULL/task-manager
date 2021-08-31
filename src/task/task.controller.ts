/**
 * Author: SyntaxErrorLineNULL.
 */

import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskRequest } from './request/create.task.request';
import { Task } from '../application/entity/task.entity';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('create')
  async createTask(@Body() body: CreateTaskRequest): Promise<Task> {
    return await this.taskService.createTask(body);
  }

  @Get('tasks')
  async getAllTask(): Promise<Task[]> {
    return await this.taskService.getAll();
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return await this.taskService.getById(id);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.taskService.remove(id);
  }
}
