/**
 * Author: SyntaxErrorLineNULL.
 */

import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from '../../api/controller/auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../components/guard/jwt/jwt.strategy';
import { jwtConfig } from '../../../config/jwt.config';
import { MailModule } from '../../core/mail/mail.module';
import { UserMapper } from '../common/mapper/user.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/entity/user.repository';

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
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [AuthService, JwtStrategy, UserMapper],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
