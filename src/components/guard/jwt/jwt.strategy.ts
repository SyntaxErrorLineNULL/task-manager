/**
 * Author: SyntaxErrorLineNULL.
 */

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from '../../../../config/jwt.config';
import { Injectable } from '@nestjs/common';
import { PayloadJwt } from '../../../core/guard/interface/payload.jwt';
import { User } from '../../../modules/user/entity/user.entity';
import { UserRepository } from '../../../modules/user/entity/user.repository';
import { AuthorizationException } from '../../exception/auth.exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
      ignoreExpiration: false,
    });
  }

  protected async validate(payload: PayloadJwt): Promise<User> {
    console.log(payload);
    const timeDiff = payload.exp - payload.iat;
    const user = await this.userRepository.findOne(payload.id);

    if (timeDiff <= 0 || !user) {
      throw AuthorizationException.wrongAuthorizationValidate();
    }

    return user;
  }
}
