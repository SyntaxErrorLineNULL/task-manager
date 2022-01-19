/**
 * Author: SyntaxErrorLineNULL.
 */

import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './entity/user.repository';
import { UserController } from '../../api/controller/user.controller';
import { AuthModule } from '../auth/auth.module';
import { PasswordService } from '../../components/guard/service/password.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService, PasswordService],
  controllers: [UserController],
  exports: [UserService, PasswordService],
})
export class UserModule {}
