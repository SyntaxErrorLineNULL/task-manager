/**
 * Author: SyntaxErrorLineNULL.
 */

import { EntityRepository, Repository } from 'typeorm';
import TaskEntity from '../../application/entity/task.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
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
  async getTaskById(id: string): Promise<TaskEntity> {
    const task = await this.findOne({ where: { id } });
    if (task === null) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async getAllTask(): Promise<TaskEntity[]> {
    return await this.find({ order: { id: 'DESC', title: 'ASC' } });
  }
}
