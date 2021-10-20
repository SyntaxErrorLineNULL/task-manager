/**
 * Author: SyntaxErrorLineNULL.
 */

import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * @param id
   */
  public async getUserById(id: string): Promise<User> {
    const user = await this.findOne({ where: { id } });
    if (user === null) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  public async getAllUser(): Promise<User[]> {
    return await this.find({ order: { id: 'DESC', createAt: 'ASC' } });
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.findOne({ where: { email } });
  }

  public async getByToken(token: string): Promise<User> {
    const user = await this.findOne({
      where: { confirmationToken: { value: token } },
    });
    if (user === null) {
      throw new NotFoundException(`Token is not found`);
    }
    return user;
  }
}
