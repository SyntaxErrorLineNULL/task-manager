/**
 * Author: SyntaxErrorLineNULL.
 */
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from '../../../config/jwt.config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeader(),
      ignoreExpiration: jwtConfig.jwtExpirationTime,
      secretOrKey: jwtConfig.secret,
    });
  }
}
