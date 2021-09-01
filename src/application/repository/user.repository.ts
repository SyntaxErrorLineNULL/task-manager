/**
 * Author: SyntaxErrorLineNULL.
 */

import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import UserEntity from '../entity/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  /**
   * @param id
   */
  async getTaskById(id: string): Promise<UserEntity> {
    const user = await this.findOne({ where: { id } });
    if (user === null) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return user;
  }

  async getAllUser(): Promise<UserEntity[]> {
    return await this.find({ order: { id: 'DESC', createAt: 'ASC' } });
  }
}
