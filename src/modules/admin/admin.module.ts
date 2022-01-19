/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './entity/admin.repository';
import { AdminService } from './admin.service';
import { PasswordService } from '../../components/guard/service/password.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminRepository])],
  providers: [TypeOrmModule, AdminService, PasswordService],
  exports: [AdminService, PasswordService],
})
export class AdminModule {}
