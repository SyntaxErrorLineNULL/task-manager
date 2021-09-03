/**
 * Author: SyntaxErrorLineNULL.
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from '../../application/repository/task.repository';
import { CreateTaskDto } from '../common/dto/create.task.dto';
import TaskEntity from '../../application/entity/task.entity';
import CategoryRepository from '../../application/repository/category.repository';

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
   */
  async createTask(schema: CreateTaskDto): Promise<TaskEntity> {
    const { title, description, categoryIds } = schema;
    const task = new TaskEntity();
    task.title = title;
    task.description = description;
    task.categoryIds = [];
    for (let i = 0; i < categoryIds.length; i++) {
      const category = await this.categoryRepository.findOne(categoryIds[i]);
      task.categoryIds.push(category);
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
   */
  async remove(id: string): Promise<void> {
    await this.taskRepository.removeTask(id);
  }
}
