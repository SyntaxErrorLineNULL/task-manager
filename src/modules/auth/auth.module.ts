/**
 * Author: SyntaxErrorLineNULL.
 */

import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordService } from '../../application/service/password.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../core/guard/jwt.strategy';
import { jwtConfig } from '../../../config/jwt.config';
import { MailModule } from '../../core/mail/mail.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
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
  ],
  providers: [AuthService, PasswordService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
