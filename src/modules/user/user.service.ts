/**
 * Author: SyntaxErrorLineNULL.
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../application/repository/user.repository';
import { SignUpSchema } from '../common/request/signUp.schema';
import UserEntity from '../../application/entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { TokenEntity } from '../../application/entity/token.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async create(
    schema: SignUpSchema,
    confirmationToken: TokenEntity,
  ): Promise<UserEntity> {
    const user = new UserEntity(
      schema.name,
      schema.email,
      await bcrypt.hashSync(schema.password, 12),
    );

    user.confirmationToken = confirmationToken;
    return await this.userRepository.save(user);
  }

  public async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findByEmail(email);
  }

  public async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.getAllUser();
  }

  public async getById(id: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  public async confirmationToken(token: string): Promise<void> {
    const user = await this.userRepository.getByToken(token);
    user.confirmationRegistration(new Date());
    await this.userRepository.save(user);
  }
}
