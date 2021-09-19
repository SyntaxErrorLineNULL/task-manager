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
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { TaskStatusEnum } from './task.status.enum';
import { v4 as uuidv4 } from 'uuid';
import UserEntity from './user.entity';
import CategoryEntity from './category.entity';

@Entity()
export default class TaskEntity extends BaseEntity {
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
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'createAt',
  })
  createAt: Date;

  @Column({
    type: 'timestamp without time zone',
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

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categoryIds?: CategoryEntity[];

  @ManyToOne(() => UserEntity, (user) => user.tasks, {
    eager: false,
    nullable: true,
  })
  user?: UserEntity | null;
}
