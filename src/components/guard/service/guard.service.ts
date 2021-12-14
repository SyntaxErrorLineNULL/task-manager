/**
 * Author: SyntaxErrorLineNULL.
 */
import { Inject, Injectable } from '@nestjs/common';
import { PasswordService } from '../password.service';
import { JwtService } from '@nestjs/jwt';
import { GUARD_PROVIDER, GuardProvider } from '../guard.provider';
import { AuthorizationException } from '../auth.exception';
import { User } from '../../../modules/user/entity/user.entity';
import { jwtConfig } from '../../../../config/jwt.config';

@Injectable()
export class GuardService {
  constructor(
    @Inject(GUARD_PROVIDER) private guardProvider: GuardProvider,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  public async login() {
    const user = await this.guardProvider.searchByEmail('');
    if (!user) throw AuthorizationException.wrongSignIn();
    const passwordValid = await this.passwordService.validate('', user.passwordHash);
    if (!passwordValid) throw AuthorizationException.wrongSignIn();

    return await this.signIn(user);
  }

  private async multiFactorLogin(phone: string) {}

  private async signIn(user: User): Promise<{ accessToken: string; expiresIn: number }> {
    return {
      accessToken: await this.jwtService.signAsync(''),
      expiresIn: jwtConfig.jwtExpirationTime,
    };
  }
}
