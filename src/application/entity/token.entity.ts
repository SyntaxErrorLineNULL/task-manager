/**
 * Author: SyntaxErrorLineNULL.
 */

import { Entity, Column, CreateDateColumn } from 'typeorm';

@Entity('token')
export class TokenEntity {
  @Column({ type: 'varchar', nullable: true, default: null })
  value?: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  expires?: Date;
}
