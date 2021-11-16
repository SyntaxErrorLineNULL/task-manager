/**
 * Author: SyntaxErrorLineNULL.
 */

import { Column, Entity, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class Admin extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  email: string;
  @Column()
  passwordHash: string;
}
