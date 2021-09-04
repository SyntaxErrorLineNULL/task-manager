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
import { ConfigJwtService } from '../../../config/config-jwt.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useClass: ConfigJwtService,
    }),
  ],
  providers: [AuthService, PasswordService],
  controllers: [AuthController],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' }), AuthService],
})
export class AuthModule {}
