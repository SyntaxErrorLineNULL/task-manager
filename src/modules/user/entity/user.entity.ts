/**
 * Author: SyntaxErrorLineNULL.
 */

import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { UserStatusEnum } from '../enum/user.status.enum';
import { Role } from '../enum/role';
import { Token } from './token.entity';
import { PasswordService } from '../../../components/guard/service/password.service';
import { AuthorizationException } from '../../../components/exception/auth.exception';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  passwordHash: string;

  @CreateDateColumn({ type: 'timestamp', name: 'createdAt', default: () => 'DATE_ADD(CURRENT_TIMESTAMP)' })
  createAt: Date;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.STATUS_UNCONFIRMED,
  })
  status: UserStatusEnum;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  /*public confirmationRegistration(date: Date): void {
    this.confirmationToken.validate(date);
    this.status = UserStatusEnum.STATUS_ACTIVE;
    this.confirmationToken.value = null;
    this.confirmationToken.expires = null;
  }*/

  public changeStatus(status: UserStatusEnum): void {
    this.status = status;
  }

  public async validate(password: string, passwordService: PasswordService): Promise<void> {
    if ((await passwordService.validate(password, this.passwordHash)) || this.status !== UserStatusEnum.STATUS_ACTIVE) {
      throw AuthorizationException.wrongConfirmationValidate();
    }
  }
}
