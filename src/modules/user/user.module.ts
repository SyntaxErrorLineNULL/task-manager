/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../../application/repository/user.repository';
import { PasswordService } from '../../application/service/password.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService, PasswordService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
