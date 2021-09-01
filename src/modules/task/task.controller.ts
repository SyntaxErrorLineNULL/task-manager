/**
 * Author: SyntaxErrorLineNULL.
 */

import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from '../common/dto/create.task.dto';
import TaskEntity from '../../application/entity/task.entity';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('create')
  async createTask(@Body() body: CreateTaskDto): Promise<TaskEntity> {
    return await this.taskService.createTask(body);
  }

  @Get('tasks')
  async getAllTask(): Promise<TaskEntity[]> {
    return await this.taskService.getAll();
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<TaskEntity> {
    return await this.taskService.getById(id);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.taskService.remove(id);
  }
}
