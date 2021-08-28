/**
 * Author: SyntaxErrorLineNULL.
 */

import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Task } from "./task.entity";

@Entity()
export class User {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column('string')
  name: string;

  @Column('string')
  email: string;

  @Column('string')
  passwordHash: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({ default: 0 })
  countTaskComplete: number;

  @OneToMany(() => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
