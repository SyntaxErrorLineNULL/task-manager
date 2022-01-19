/**
 * Author: SyntaxErrorLineNULL.
 */

import { Body, Controller, Get, Param, Post, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { CreateTaskSchema } from '../../modules/common/request/create.task.schema';
import { Task as TaskEntity } from '../../modules/task/entity/task.entity';
import { ApiBody, ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../components/guard/jwt/jwt-auth.guard';
import { Authentication } from '../../core/decorator/user.decorator';
import { TaskDto } from '../../modules/common/dto/task.dto';
import { TaskCollection } from '../../modules/common/dto/task.collection';
import { UpdateTaskSchema } from '../../modules/common/request/update.task.schema';
import { TaskService } from '../../modules/task/service/task.service';

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
  public async createTask(@Body() body: CreateTaskSchema, @Authentication() auth): Promise<TaskDto> {
    console.log(auth);
    return await this.taskService.createTask(body, auth);
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
