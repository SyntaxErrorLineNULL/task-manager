import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from '../application/repository/task.repository';
import { Task } from '../application/entity/task.entity';
import { CreateTaskRequest } from './request/create.task.request';

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

  async createTask(entity: CreateTaskRequest): Promise<Task> {
    return this.taskRepository.createTask(entity);
  }

  async getAll(): Promise<Task[]> {
    return this.taskRepository.getAllTask();
  }

  async getById(id: string): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }
}
