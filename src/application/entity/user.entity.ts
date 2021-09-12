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
  OneToMany,
} from 'typeorm';
import { UserStatusEnum } from './user.status.enum';
import { v4 as uuidv4 } from 'uuid';
import { Role } from './role';
import TaskEntity from './task.entity';
import { TokenEntity } from './token.entity';

@Entity('user')
export default class UserEntity extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @BeforeInsert()
  async generateId(): Promise<void> {
    this.id = await uuidv4();
  }

  @Column({ type: 'varchar' })
  name: string;

  @Column({ unique: true })
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
    default: UserStatusEnum.STATUS_UNCONFIRMED,
  })
  status: UserStatusEnum;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => TaskEntity, (task) => task.user, { eager: true })
  tasks: TaskEntity[];

  @Column(() => TokenEntity)
  confirmationToken?: TokenEntity;
}
