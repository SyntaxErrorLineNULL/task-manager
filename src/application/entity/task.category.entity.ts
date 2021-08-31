/**
 * Author: SyntaxErrorLineNULL.
 */

import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TaskCategory extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column('varchar')
  name: string;
}
