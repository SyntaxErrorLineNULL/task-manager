/**
 * Author: SyntaxErrorLineNULL.
 */

import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { TaskStatusEnum } from './task.status.enum';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Task extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @BeforeInsert()
  async generateId(): Promise<void> {
    this.id = await uuidv4();
  }

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'createAt',
  })
  createAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'null',
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

  /*@ManyToOne(() => User, (user) => user.tasks, { eager: false })
  user: User;*/
}
