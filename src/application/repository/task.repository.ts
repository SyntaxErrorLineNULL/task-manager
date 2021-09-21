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
  public async removeTask(id: string): Promise<void> {
    const task = await this.delete({ id });

    if (task.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  /**
   * @param id
   */
  public async getTaskById(id: string): Promise<TaskEntity> {
    const task = await this.findOne({
      where: { id },
      relations: ['user', 'categoryIds'],
    });
    if (task === null) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  public async getAllTask(): Promise<TaskEntity[]> {
    return await this.find({
      order: { id: 'DESC', title: 'ASC' },
      relations: ['user', 'categoryIds'],
    });
  }
}
