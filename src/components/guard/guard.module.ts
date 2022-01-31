/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from '../../core/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../../../config/jwt.config';
import { JwtStrategy } from './jwt/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../../modules/user/entity/user.repository';

@Module({
  imports: [
    PassportModule,
    MailModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {
        algorithm: 'HS512',
        expiresIn: jwtConfig.jwtExpirationTime,
      },
      verifyOptions: {
        algorithms: ['HS512'],
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [JwtStrategy],
  exports: [JwtModule],
})
export class GuardModule {}
