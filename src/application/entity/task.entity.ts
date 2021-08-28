/**
 * Author: SyntaxErrorLineNULL.
 */

import {
  BaseEntity,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { TaskStatusEnum } from './task.status.enum';
import { User } from './user.entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  finishAt?: Date;

  @BeforeUpdate()
  updateTimestamp(): void {
    this.finishAt = new Date();
  }

  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
    default: TaskStatusEnum.STATUS_START,
  })
  status: TaskStatusEnum;

  @BeforeUpdate()
  changeStatus(): void {
    this.status = TaskStatusEnum.STATUS_DONE;
  }

  /*@ManyToOne(() => User, (user) => user.tasks, { eager: false })
  user: User;*/
}
