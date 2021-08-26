import { EntityRepository, RemoveOptions, Repository } from 'typeorm';
import { Task } from '../entity/task.entity';
import { NotFoundException } from './not.found.exception';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  /**
   * @param entity Task
   */
  async createTask(entity: Task): Promise<void> {
    const task = this.create(entity);
    await this.save(task);
  }

  /**
   * @param entities
   * @param options
   */
  async removeTask(entities: Task[], options?: RemoveOptions): Promise<void> {
    await this.remove(entities, options);
  }

  /**
   * @param id
   */
  async getTaskById(id: string): Promise<Task> {
    const task = await this.findOne({ where: { id } });
    if (task === null) {
      throw new NotFoundException();
    }
    return task;
  }

  async getAllTask(): Promise<Task[]> {
    return await this.find({ order: { id: 'DESC', title: 'ASC' } });
  }
}
