/**
 * Author: SyntaxErrorLineNULL.
 */

import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SessionEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  device: string;

  @Column()
  ipAddress: string;
}
