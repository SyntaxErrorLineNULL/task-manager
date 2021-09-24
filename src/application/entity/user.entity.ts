/**
 * Author: SyntaxErrorLineNULL.
 */

import {
  BaseEntity,
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
import * as bcrypt from 'bcryptjs';
import { HttpException, HttpStatus } from '@nestjs/common';

@Entity('user')
export default class UserEntity extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  passwordHash: string;

  @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
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
  confirmationToken?: TokenEntity = null;

  constructor(name: string, email: string, passwordHash: string) {
    super();
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createAt = new Date();
  }

  public confirmationRegistration(date: Date): void {
    this.confirmationToken.validate(date);
    this.status = UserStatusEnum.STATUS_ACTIVE;
    this.confirmationToken.value = null;
    this.confirmationToken.expires = null;
  }

  public async validate(password: string): Promise<void> {
    if ((await bcrypt.compareSync(password, this.passwordHash)) ||
      this.status !== UserStatusEnum.STATUS_ACTIVE
    ) {
      throw new HttpException(
        'Password is not correct. Maybe... . Check your inbox, you may not have noticed the message that your account has been blocked',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
