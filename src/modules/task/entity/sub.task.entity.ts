/**
 * Author: SyntaxErrorLineNULL.
 */

import { BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class SubTask extends BaseEntity {
  @Column({ type: 'uuid' })
  id: string;

  @Column({ type: 'uuid' })
  parentTaskId: string;

  @Column({ type: 'text' })
  content: string;
}
