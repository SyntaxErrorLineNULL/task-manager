import { EntityRepository, RemoveOptions, Repository } from 'typeorm';
import { Task } from '../entity/task.entity';
import { NotFoundException } from './not.found.exception';
import { CreateTaskRequest } from '../../task/request/create.task.request';
import { v4 as uuidv4 } from 'uuid';
import { TaskStatusEnum } from '../entity/task.status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private description: any;
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
