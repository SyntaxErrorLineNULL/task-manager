/**
 * Author: SyntaxErrorLineNULL.
 */
import { GuardProvider } from '../../../components/guard/provider/guard.provider';
import { UserRepository } from '../../../modules/user/entity/user.repository';
import { Injectable } from '@nestjs/common';
import { Role } from '../../../modules/user/enum/role';

@Injectable()
export class UserGuardProvider implements GuardProvider {
  constructor(private userRepository: UserRepository) {}

  async provideByEmail(email: string): Promise<any> {
    const user = await this.userRepository.findOne({ email });
    if (!user) return null;
    return {
      id: user.id,
      roles: [user.role],
      email,
      passwordHash: user.passwordHash,
    };
  }

  async provideJWTToken(id: string): Promise<any> {
    return {
      userId: id,
      roles: [Role.USER],
    };
  }
}
