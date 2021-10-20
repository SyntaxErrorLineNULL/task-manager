/**
 * Author: SyntaxErrorLineNULL.
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './entity/user.repository';
import { SignUpSchema } from '../common/request/signUp.schema';
import { User } from './entity/user.entity';
import { Token } from './entity/token.entity';
import { PasswordService } from './service/password.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  public async create(schema: SignUpSchema, confirmationToken: Token): Promise<User> {
    const user = new User(schema.name, schema.email, await this.passwordService.hash(schema.password));

    user.confirmationToken = confirmationToken;
    return await this.userRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  public async getAll(): Promise<User[]> {
    return await this.userRepository.getAllUser();
  }

  public async getById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  public async confirmationToken(token: string): Promise<void> {
    const user = await this.userRepository.getByToken(token);
    user.confirmationRegistration(new Date());
    await this.userRepository.save(user);
  }
}
