/**
 * Author: SyntaxErrorLineNULL.
 */

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AdminRepository } from './entity/admin.repository';
import { generateString } from '@nestjs/typeorm';
import { PasswordService } from '../user/service/password.service';

@Injectable()
export class AdminService implements OnApplicationBootstrap {
  constructor(private adminRepository: AdminRepository, private passwordService: PasswordService) {}

  async onApplicationBootstrap(): Promise<void> {
    let admin = await this.adminRepository.findOne({ where: { email: 'cyberorange16@gmail.com' } });
    if (!admin) {
      admin = await this.adminRepository.create({
        id: generateString(),
        email: 'cyberorange16@gmail.com',
        passwordHash: await this.passwordService.hash('TYA#@$Y9r5CdZ'),
      });
      await this.adminRepository.save(admin);
      console.log('admin install');
    }
  }
}
