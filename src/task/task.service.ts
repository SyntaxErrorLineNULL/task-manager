import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from '../application/repository/task.repository';
import { Task } from '../application/entity/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  private message = 'Hello, world';

  printMessage(): string {
    return this.message;
  }

  createTask(entity: Task): Promise<void> {
    return this.taskRepository
      .createTask(entity)
      .then((r): void => console.log(r));
  }
}
