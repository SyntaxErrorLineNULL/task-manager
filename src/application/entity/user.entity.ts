/**
 * Author: SyntaxErrorLineNULL.
 */

import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Task } from './task.entity';
import { UserStatusEnum } from './user.status.enum';

@Entity()
export class User {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  passwordHash: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({ default: 0 })
  countTaskComplete: number;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.STATUS_ACTIVE,
  })
  status: UserStatusEnum;

  /*@OneToMany(() => Task, (task) => task.user, { eager: true })
  tasks: Task[];*/
}
