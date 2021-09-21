/**
 * Author: SyntaxErrorLineNULL.
 */

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskSchema } from '../common/request/create.task.schema';
import TaskEntity from '../../application/entity/task.entity';
import { ApiBody, ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guard/jwt-auth.guard';
import { Authentication } from '../../core/decorator/user.decorator';
import { TaskDto } from '../common/dto/task.dto';

@Controller('task')
@ApiTags('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: [CreateTaskSchema] })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create task',
    type: CreateTaskSchema,
  })
  async createTask(
    @Body() body: CreateTaskSchema,
    @Request() req,
  ): Promise<TaskEntity> {
    return await this.taskService.createTask(body, req.user);
  }

  @Get('tasks')
  async getAllTask(): Promise<TaskDto[]> {
    return await this.taskService.getAll();
  }

  @Get('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get task by id',
    type: TaskDto,
  })
  async getTaskById(@Param('id') id: string): Promise<TaskDto> {
    return await this.taskService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create task',
    type: CreateTaskSchema,
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { oneOf: [{ type: 'string' }] },
  })
  @Delete('remove/:id')
  async remove(@Param('id') id: string, @Authentication() auth): Promise<void> {
    return await this.taskService.remove(id, auth);
  }

  @Post('done/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Close task',
  })
  async doneTask(
    @Param('id') id: string,
    @Authentication() auth,
  ): Promise<TaskEntity> {
    return await this.taskService.done(id, auth);
  }
}
