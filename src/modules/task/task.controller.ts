/**
 * Author: SyntaxErrorLineNULL.
 */

import { Body, Controller, Get, Param, Post, Delete, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskSchema } from '../common/request/create.task.schema';
import TaskEntity from '../../application/entity/task.entity';
import { ApiBody, ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guard/jwt-auth.guard';
import { Authentication } from '../../core/decorator/user.decorator';
import { TaskDto } from '../common/dto/task.dto';
import { TaskCollection } from '../common/dto/task.collection';
import { UpdateTaskSchema } from '../common/request/update.task.schema';

@Controller('task')
@ApiTags('task')
export class TaskController {
  public constructor(private taskService: TaskService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateTaskSchema })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create task',
    type: TaskDto,
  })
  public async createTask(@Body() body: CreateTaskSchema, @Request() req): Promise<TaskDto> {
    return await this.taskService.createTask(body, req.user);
  }

  @Get('tasks')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all task',
    type: TaskCollection,
  })
  public async getAllTask(): Promise<TaskCollection> {
    return await this.taskService.getAll();
  }

  @Get('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get task by id',
    type: TaskDto,
  })
  public async getTaskById(@Param('id') id: string): Promise<TaskDto> {
    return await this.taskService.getById(id);
  }

  @Delete('remove/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Remove task',
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { oneOf: [{ type: 'string' }] },
  })
  public async remove(@Param('id') id: string, @Authentication() auth): Promise<void> {
    await this.taskService.remove(id, auth);
  }

  @Post('done/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Close task',
  })
  public async doneTask(@Param('id') id: string, @Authentication() auth): Promise<TaskEntity> {
    return await this.taskService.done(id, auth);
  }

  @Post('update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateTaskSchema })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Update task',
    type: TaskDto,
  })
  public async update(
    @Body() body: UpdateTaskSchema,
    @Param('id') id: string,
    @Authentication() auth,
  ): Promise<TaskDto> {
    return this.taskService.update(id, body, auth);
  }

  @Get('/')
  public testMethod(): string {
    return 'Hello World!';
  }
}
