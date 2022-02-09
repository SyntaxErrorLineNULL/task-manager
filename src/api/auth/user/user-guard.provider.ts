/**
 * Author: SyntaxErrorLineNULL.
 */
import { GuardProvider } from '../../../components/guard/provider/guard.provider';
import { UserRepository } from '../../../modules/user/entity/user.repository';
import { Injectable } from '@nestjs/common';
import { Role } from '../../../modules/user/enum/role';
import { UserStatusEnum } from '../../../modules/user/enum/user.status.enum';
import { AuthorizationException } from '../../../components/exception/auth.exception';

export interface UserDataProvider {
  id: string;
  roles: string[];
  email: string;
  passwordHash: string;
}

@Injectable()
export class UserGuardProvider implements GuardProvider {
  constructor(private userRepository: UserRepository) {}

  async provideByEmail(email: string): Promise<UserDataProvider> {
    const user = await this.userRepository.findOne({ email });
    if (!user) return null;
    if (user.status === UserStatusEnum.STATUS_BLOCKED) throw AuthorizationException.wrongBlockedUser();
    return {
      id: user.id,
      roles: [user.role],
      email,
      passwordHash: user.passwordHash,
    };
  }

  async provideJWTToken(id: string, roles: Role): Promise<any> {
    return {
      userId: id,
      roles: [roles],
    };
  }
}
