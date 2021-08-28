/**
 * Author: SyntaxErrorLineNULL.
 */

import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TaskCategory {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column('varchar')
  name: string;
}
