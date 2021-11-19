/**
 * Author: SyntaxErrorLineNULL.
 */

import { BaseEntity, Column, Entity } from 'typeorm';

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
}
