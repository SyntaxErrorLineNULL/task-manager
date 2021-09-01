/**
 * Author: SyntaxErrorLineNULL.
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from '../../application/repository/task.repository';
import { CreateTaskRequest } from './request/create.task.request';
import TaskEntity from '../../application/entity/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  /**
   * @param entity
   */
  async createTask(entity: CreateTaskRequest): Promise<TaskEntity> {
    const user = this.taskRepository.create(entity);
    return this.taskRepository.save(user);
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
   */
  async remove(id: string): Promise<void> {
    await this.taskRepository.removeTask(id);
  }
}
