/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './entity/admin.repository';
import { AdminService } from './admin.service';
import { PasswordService } from '../user/service/password.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminRepository])],
  exports: [AdminService, PasswordService],
  providers: [TypeOrmModule, AdminService],
})
export class AdminModule {}
