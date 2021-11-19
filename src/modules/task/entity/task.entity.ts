/**
 * Author: SyntaxErrorLineNULL.
 */

import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { TaskStatus } from './task.status.enum';
import { Category } from '../../category/entity/category.entity';
import { generateString } from '@nestjs/typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn({ type: 'timestamp', name: 'createAt' })
  createAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  finishAt?: Date = null;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.STATUS_START,
  })
  status: TaskStatus;

  @ManyToMany(() => Category, { eager: true })
  @JoinTable()
  categoryIds?: Category[];

  @Column({ type: 'uuid' })
  authorId: string;

  @Column({ type: 'uuid' })
  listId: string;

  /**
   * @param title
   * @param description
   * @param authorId
   */
  constructor(title: string, description: string, authorId: string) {
    super();
    this.id = generateString();
    this.title = title;
    this.description = description;
    this.authorId = authorId;
    this.createAt = new Date();
  }

  public doneTask(): void {
    this.finishAt = new Date();
    this.status = TaskStatus.STATUS_DONE;
  }
}
