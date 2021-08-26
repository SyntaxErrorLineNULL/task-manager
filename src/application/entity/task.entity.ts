import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { TaskStatusEnum } from './task.status.enum';

@Entity()
export class TaskEntity extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'string' })
  title: string;

  @Column({ type: 'string' })
  description: string;

  @Column({ type: 'timestamp' })
  createAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  finishAt: Date;

  @Column({ type: 'string' })
  status: TaskStatusEnum;

  constructor(title: string, description: string, createAt: Date) {
    super();
    this.title = title;
    this.description = description;
    this.createAt = createAt;
    this.finishAt = null;
    this.status = TaskStatusEnum.STATUS_START;
  }
}
