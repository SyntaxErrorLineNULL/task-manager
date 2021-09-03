/**
 * Author: SyntaxErrorLineNULL.
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../application/repository/user.repository';
import { PasswordService } from '../../application/service/password.service';
import { SignUpDto } from '../common/dto/signUp.dto';
import UserEntity from '../../application/entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private passwordService: PasswordService,
  ) {}

  public async createUser(schema: SignUpDto): Promise<void> {
    const { name, email, password } = schema;
    const user = new UserEntity();
    user.name = name;
    user.email = email;
    user.passwordHash = await this.passwordService.hash(password);
    await this.userRepository.save(user);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findByEmail(email);
  }
}
