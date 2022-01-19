/**
 * Author: SyntaxErrorLineNULL.
 */

import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '../../../../config/jwt.config';
import { GUARD_DATA_PROVIDER, GuardProvider } from '../provider/guard.provider';
import { PasswordService } from './password.service';
import { AuthorizationException } from '../../exception/auth.exception';

@Injectable()
export class GuardService {
  constructor(
    @Inject(GUARD_DATA_PROVIDER) private guardProvider: GuardProvider,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  public async login(email: string, password: string) {
    const user = await this.guardProvider.provideByEmail(email);
    if (!user) throw AuthorizationException.wrongSignIn();
    const passwordValid = await this.passwordService.validate(password, user.passwordHash);
    if (!passwordValid) throw AuthorizationException.wrongSignIn();

    return await this.signIn(await this.guardProvider.provideJWTToken(user.id));
  }

  private async signIn(data: any): Promise<{ accessToken: string; expiresIn: number }> {
    return {
      accessToken: await this.jwtService.signAsync({ data }),
      expiresIn: jwtConfig.jwtExpirationTime,
    };
  }
}
