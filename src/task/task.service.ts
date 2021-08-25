import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  private message = 'Hello, world';

  printMessage(): string {
    return this.message;
  }
}
