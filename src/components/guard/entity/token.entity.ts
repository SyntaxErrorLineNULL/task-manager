/**
 * Author: SyntaxErrorLineNULL.
 */

import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  code: number;

  @Column()
  createdAt: Date;
}
