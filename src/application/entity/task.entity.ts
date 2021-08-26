import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { TaskStatusEnum } from './task.status.enum';

@Entity()
export class Task extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'character', length: 45 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp' })
  createAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  finishAt?: Date;

  @Column({ type: 'character' })
  status: TaskStatusEnum;

  constructor(id: string, title: string, description: string) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.createAt = new Date();
    this.finishAt = null;
    this.status = TaskStatusEnum.STATUS_START;
  }
}
