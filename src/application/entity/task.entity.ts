/**
 * Author: SyntaxErrorLineNULL.
 */

import {
  BaseEntity,
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

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn({ type: 'timestamp', name: 'createAt' })
  createAt: Date;

  @Column({ type: 'timestamp without time zone', nullable: true })
  finishAt?: Date = null;

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

  /**
   * @param title
   * @param description
   * @param user
   */
  constructor(title: string, description: string, user?: UserEntity) {
    super();
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.user = user;
    this.createAt = new Date();
  }

  public doneTask(): void {
    this.finishAt = new Date();
    this.status = TaskStatusEnum.STATUS_DONE;
  }

  public update(title?: string, description?: string): void {
    this.title = title ?? this.title;
    this.description = description ?? this.description;
  }
}
