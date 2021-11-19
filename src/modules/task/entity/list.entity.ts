/**
 * Author: SyntaxErrorLineNULL.
 */

import { BaseEntity, Entity, Column } from 'typeorm';
@Entity()
export class List extends BaseEntity {
  @Column({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid' })
  board: string;
}
