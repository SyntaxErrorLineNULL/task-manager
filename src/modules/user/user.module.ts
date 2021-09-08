/**
 * Author: SyntaxErrorLineNULL.
 */

import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../../application/repository/user.repository';
import { PasswordService } from '../../application/service/password.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [UserService, PasswordService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
