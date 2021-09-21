/**
 * Author: SyntaxErrorLineNULL.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from '../../application/repository/task.repository';
import { CreateTaskDto } from '../common/dto/create.task.dto';
import TaskEntity from '../../application/entity/task.entity';
import CategoryRepository from '../../application/repository/category.repository';
import UserEntity from '../../application/entity/user.entity';
import { TaskStatusEnum } from '../../application/entity/task.status.enum';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  /**
   * @param schema
   * @param user
   */
  async createTask(
    schema: CreateTaskDto,
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

  async getAll(): Promise<TaskEntity[]> {
    return this.taskRepository.getAllTask();
  }

  /**
   * @param id
   */
  async getById(id: string): Promise<TaskEntity> {
    return this.taskRepository.getTaskById(id);
  }

  /**
   * @param id
   * @param user
   */
  async remove(id: string, user: UserEntity): Promise<void> {
    const task = await this.getById(id);
    if (task.user.id !== user.id) {
      throw new NotFoundException('User is not owner this task');
    }
    await this.taskRepository.removeTask(id);
  }

  async done(id: string, user: UserEntity): Promise<TaskEntity> {
    const task = await this.getById(id);
    if ((await task).user.id !== user.id) {
      throw new NotFoundException('User is not owner this task');
    }
    task.status = TaskStatusEnum.STATUS_DONE;
    return task;
  }
}
