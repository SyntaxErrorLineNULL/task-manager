/**
 * Author: SyntaxErrorLineNULL.
 */

import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column()
  code: number;

  @Column()
  createdAt: Date;

  public create(id: string, userId: string, createdAt: Date) {
    this.id = id;
    this.userId = userId;
    this.createdAt = createdAt;
  }
}
