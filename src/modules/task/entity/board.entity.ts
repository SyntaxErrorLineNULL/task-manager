/**
 * Author: SyntaxErrorLineNULL.
 */

import { BaseEntity, Column } from 'typeorm';

export class Board extends BaseEntity {
  @Column({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid' })
  authorId: string;
}
