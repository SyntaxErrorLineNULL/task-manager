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
  ): Promise<TaskEntity> {
    const task = new TaskEntity(schema.title, schema.description, user);
    task.categoryIds = [];

    for (let i = 0; i < schema.categoryIds.length; i++) {
      const cat = await this.categoryRepository.findOne(schema.categoryIds[i]);
      task.categoryIds.push(cat);
    }

    return await this.taskRepository.save(task);
  }

  public async getAll(): Promise<TaskCollection> {
    const tasks = await this.taskRepository.getAllTask();
    const items = tasks.map((task) => this.taskMapper.mapper(task));
    return new TaskCollection(items);
  }

  /**
   * @param id
   */
  public async getById(id: string): Promise<TaskDto> {
    const task = await this.taskRepository.getTaskById(id);
    return this.taskMapper.mapper(task);
  }

  /**
   * @param id
   * @param user
   */
  public async remove(id: string, user: UserEntity): Promise<void> {
    const task = await this.owner(user, id);
    await this.taskRepository.removeTask(task.id);
  }

  public async done(id: string, user: UserEntity): Promise<TaskEntity> {
    const task = await this.owner(user, id);
    await task.doneTask();
    return task;
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
