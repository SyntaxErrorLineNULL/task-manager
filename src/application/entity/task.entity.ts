import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { TaskStatusEnum } from './task.status.enum';

@Entity()
export class Task extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp' })
  createAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  finishAt?: Date = null;

  @Column()
  status: TaskStatusEnum;
}
