import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { NotFoundException } from '@nestjs/common';

/**
 * Author: SyntaxErrorLineNULL.
 */

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * @param id
   */
  async getTaskById(id: string): Promise<User> {
    const user = await this.findOne({ where: { id } });
    if (user === null) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return user;
  }

  async getAllUser(): Promise<User[]> {
    return await this.find({ order: { id: 'DESC', createAt: 'ASC' } });
  }
}
