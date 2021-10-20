/**
 * Author: SyntaxErrorLineNULL.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  /**
   * @param id
   */
  public async removeTask(id: string): Promise<void> {
    const task = await this.delete({ id });

    if (task.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  /**
   * @param id
   */
  public async getTaskById(id: string): Promise<Task> {
    const task = await this.findOne({
      where: { id },
      relations: ['user', 'categoryIds'],
    });
    if (task === null) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  public async getAllTask(): Promise<Task[]> {
    return await this.find({
      order: { id: 'DESC', title: 'ASC' },
      relations: ['user', 'categoryIds'],
    });
  }
}
