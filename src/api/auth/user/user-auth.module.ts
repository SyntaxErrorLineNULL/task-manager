/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../../../modules/user/entity/user.repository';
import { UserAuthController } from './user-auth.controller';
import { UserGuardProvider } from './user-guard.provider';
import { GUARD_DATA_PROVIDER } from '../../../components/guard/provider/guard.provider';
import { GuardAsyncRegistrationModule } from '../../../components/guard/guard.async-registration.module';
import { GuardService } from '../../../components/guard/service/guard.service';
import { PasswordService } from '../../../components/guard/service/password.service';
import { RedisService } from '../../../core/store/redis-service';
import { MailService } from '../../../core/mail/mail.service';
import { TokenService } from '../../../components/guard/service/token.service';
import { UserService } from '../../../modules/user/user.service';

@Module({
  imports: [
    GuardAsyncRegistrationModule.forRootAsync({ imports: [UserAuthModule] }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [
    GuardService,
    PasswordService,
    UserGuardProvider,
    RedisService,
    MailService,
    TokenService,
    UserService,
    {
      provide: GUARD_DATA_PROVIDER,
      useClass: UserGuardProvider,
    },
  ],
  controllers: [UserAuthController],
  exports: [
    GUARD_DATA_PROVIDER,
    GuardAsyncRegistrationModule,
    GuardService,
    PasswordService,
    RedisService,
    MailService,
    TokenService,
    UserService,
  ],
})
export class UserAuthModule {}
