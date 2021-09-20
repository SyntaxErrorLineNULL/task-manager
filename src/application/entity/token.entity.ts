/**
 * Author: SyntaxErrorLineNULL.
 */

import { Entity, Column, CreateDateColumn } from 'typeorm';

@Entity('token')
export class TokenEntity {
  @Column({ type: 'varchar', nullable: true, default: null, unique: true })
  value?: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'DATE_ADD(CURRENT_TIMESTAMP), INTERVAL 2 HOUR)',
    nullable: true,
  })
  expires?: Date;
}
