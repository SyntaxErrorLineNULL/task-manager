/**
 * Author: SyntaxErrorLineNULL.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Task } from '../entity/task.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
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
