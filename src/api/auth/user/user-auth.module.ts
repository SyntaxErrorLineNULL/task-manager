/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../../../modules/user/entity/user.repository';
import { UserAuthController } from './user-auth.controller';
import { UserGuardProvider } from './user-guard.provider';
import { GUARD_DATA_PROVIDER } from '../../../components/guard/provider/guard.provider';
import { GuardModule } from '../../../components/guard/guard.module';
import { GuardService } from '../../../components/guard/service/guard.service';

@Module({
  imports: [GuardModule, TypeOrmModule.forFeature([UserRepository])],
  providers: [
    UserGuardProvider,
    {
      provide: GUARD_DATA_PROVIDER,
      useClass: UserGuardProvider,
    },
    GuardService,
  ],
  controllers: [UserAuthController],
  exports: [GUARD_DATA_PROVIDER, GuardModule, GuardService],
})
export class UserAuthModule {}
