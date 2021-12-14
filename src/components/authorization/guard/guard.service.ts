/**
 * Author: SyntaxErrorLineNULL.
 */
import { Inject, Injectable } from '@nestjs/common';
import { PasswordService } from '../password.service';
import { JwtService } from '@nestjs/jwt';
import { GUARD_PROVIDER, GuardProvider } from '../guard.provider';
import { AuthorizationException } from '../auth.exception';

@Injectable()
export class GuardService {
  constructor(
    @Inject(GUARD_PROVIDER) private guardProvider: GuardProvider,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  public async login() {}

  public async multiFactorLogin(phone: string) {}
}
