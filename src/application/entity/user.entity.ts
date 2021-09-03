/**
 * Author: SyntaxErrorLineNULL.
 */

import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { UserStatusEnum } from './user.status.enum';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export default class UserEntity extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @BeforeInsert()
  async generateId(): Promise<void> {
    this.id = await uuidv4();
  }

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  passwordHash: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'createdAt',
  })
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
