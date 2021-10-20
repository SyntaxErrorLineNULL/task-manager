/**
 * Author: SyntaxErrorLineNULL.
 */

import { Entity, Column, CreateDateColumn } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

@Entity('token')
export class Token {
  @Column({ type: 'varchar', nullable: true, default: null, unique: true })
  value?: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'DATE_ADD(CURRENT_TIMESTAMP), INTERVAL 2 HOUR)',
    nullable: true,
  })
  expires?: Date;

  public validate(date: Date): void {
    if (this.expires > date) {
      throw new HttpException('Token is expired', HttpStatus.FORBIDDEN);
    }
  }
}
