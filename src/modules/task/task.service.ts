/**
 * Author: SyntaxErrorLineNULL.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from '../../application/repository/task.repository';
import { CreateTaskSchema } from '../common/request/create.task.schema';
import TaskEntity from '../../application/entity/task.entity';
import CategoryRepository from '../../application/repository/category.repository';
import UserEntity from '../../application/entity/user.entity';
import { TaskMapper } from '../common/mapper/task.mapper';
import { TaskDto } from '../common/dto/task.dto';
import { TaskCollection } from '../common/dto/task.collection';
import { UpdateTaskSchema } from '../common/request/update.task.schema';

@Injectable()
export class TaskService {
  public constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
    private readonly taskMapper: TaskMapper,
  ) {}

  /**
   * @param schema
   * @param user
   */
  public async createTask(
    schema: CreateTaskSchema,
    user: UserEntity,
  ): Promise<TaskDto> {
    const task = new TaskEntity(schema.title, schema.description, user);
    task.categoryIds = [];

    for (let i = 0; i < schema.categoryIds.length; i++) {
      const cat = await this.categoryRepository.findOne(schema.categoryIds[i]);
      task.categoryIds.push(cat);
    }

    await this.taskRepository.save(task);
    return this.taskMapper.mapper(task);
  }

  public async getAll(): Promise<TaskCollection> {
    const tasks = await this.taskRepository.getAllTask();
    const items = tasks.map((task) => this.taskMapper.mapper(task));
    return new TaskCollection(items);
  }

  /**
   * @param taskId
   */
  public async getById(taskId: string): Promise<TaskDto> {
    const task = await this.taskRepository.getTaskById(taskId);
    return this.taskMapper.mapper(task);
  }

  /**
   * @param taskId
   * @param user
   */
  public async remove(taskId: string, user: UserEntity): Promise<void> {
    const task = await this.owner(user, taskId);
    await this.taskRepository.removeTask(task.id);
  }

  public async done(taskId: string, user: UserEntity): Promise<TaskEntity> {
    const task = await this.owner(user, taskId);
    await task.doneTask();
    return task;
  }

  public async update(taskId: string, schema: UpdateTaskSchema, user: UserEntity): Promise<TaskDto> {
    const task = await this.owner(user, taskId);
    task.update(schema.title, schema.description);
    await this.taskRepository.save(task);
    return this.taskMapper.mapper(task);
  }

  /**
   * @param user
   * @param taskId
   * @private
   */
  private async owner(user: UserEntity, taskId: string): Promise<TaskEntity> {
    const task = await this.taskRepository.getTaskById(taskId);
    if (task.user.id !== user.id) {
      throw new NotFoundException('User is not owner this task');
    }
    return task;
  }
}
