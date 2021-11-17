/**
 * Author: SyntaxErrorLineNULL.
 */
import { BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class Label extends BaseEntity {
  @Column({ type: 'uuid' })
  id: string;

  @Column()
  label: string;
}
