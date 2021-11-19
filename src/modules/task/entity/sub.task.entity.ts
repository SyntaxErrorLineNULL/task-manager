/**
 * Author: SyntaxErrorLineNULL.
 */

import { BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class SubTask extends BaseEntity {
  @Column({ type: 'uuid' })
  id: string;

  @Column({ type: 'text' })
  parentTaskId: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  createdAt: Date;

  @Column()
  finishAt?: Date;
}
