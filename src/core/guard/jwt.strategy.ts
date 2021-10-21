/**
 * Author: SyntaxErrorLineNULL.
 */

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from '../../../config/jwt.config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';
import { PayloadJwt } from './interface/payload.jwt';
import { UserDto } from '../../modules/common/dto/user.dto';
import { User } from '../../modules/user/entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly service: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
      ignoreExpiration: false,
    });
  }

  protected async validate(payload: PayloadJwt): Promise<User> {
    const timeDiff = payload.exp - payload.iat;
    const user = await this.service.validate(payload.userId);

    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }

    console.log(payload);
    return user;
  }
}
