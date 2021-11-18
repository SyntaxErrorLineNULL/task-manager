/**
 * Author: SyntaxErrorLineNULL.
 */

import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class Board extends BaseEntity {
  @Column({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid' })
  authorId: string;

  @Column()
  imageId?: string;

  @OneToMany(() => Task, task => task.board)
  task: Task[];
}
