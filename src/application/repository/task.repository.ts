/**
 * Author: SyntaxErrorLineNULL.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Task } from '../entity/task.entity';
import { CreateTaskRequest } from '../../task/request/create.task.request';
import { v4 as uuidv4 } from 'uuid';
import { TaskStatusEnum } from '../entity/task.status.enum';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  /**
   * @param entity Task
   */
  async createTask(entity: CreateTaskRequest): Promise<Task> {
    const { title, description } = entity;
    const task = this.create({
      id: uuidv4(),
      title,
      description,
      createAt: new Date(),
      status: TaskStatusEnum.STATUS_START,
    });

    try {
      await task.save();
    } catch (error) {
      console.log(error);
    }
    return task;
  }

  /**
   * @param id
   */
  async removeTask(id: string): Promise<void> {
    const task = await this.delete({ id });

    if (task.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  /**
   * @param id
   */
  async getTaskById(id: string): Promise<Task> {
    const task = await this.findOne({ where: { id } });
    if (task === null) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async getAllTask(): Promise<Task[]> {
    return await this.find({ order: { id: 'DESC', title: 'ASC' } });
  }
}
