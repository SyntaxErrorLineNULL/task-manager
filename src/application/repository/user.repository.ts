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
  public async getUserById(id: string): Promise<UserEntity> {
    const user = await this.findOne({ where: { id } });
    if (user === null) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return user;
  }

  public async getAllUser(): Promise<UserEntity[]> {
    return await this.find({ order: { id: 'DESC', createAt: 'ASC' } });
  }

  public async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.findOne({ where: { email } });
  }
}
