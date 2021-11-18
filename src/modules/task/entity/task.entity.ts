/**
 * Author: SyntaxErrorLineNULL.
 */

import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, ManyToOne } from 'typeorm';
import { TaskStatusEnum } from './task.status.enum';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../user/entity/user.entity';
import { Category } from '../../category/entity/category.entity';
import { Board } from './board.entity';

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

  @Column({ type: 'timestamp without time zone', nullable: true })
  finishAt?: Date = null;

  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
    default: TaskStatusEnum.STATUS_START,
  })
  status: TaskStatusEnum;

  @ManyToMany(() => Category)
  @JoinTable()
  categoryIds?: Category[];

  @Column({ type: 'uuid' })
  authorId: string;

  @ManyToOne(() => Board, board => board.task)
  board: Board;

  /**
   * @param title
   * @param description
   * @param authorId
   */
  constructor(title: string, description: string, authorId: string) {
    super();
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.authorId = authorId;
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
