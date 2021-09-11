/**
 * Author: SyntaxErrorLineNULL.
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../application/repository/user.repository';
import { PasswordService } from '../../application/service/password.service';
import { SignUpDto } from '../common/dto/signUp.dto';
import UserEntity from '../../application/entity/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private passwordService: PasswordService,
  ) {}

  public async createUser(schema: SignUpDto): Promise<UserEntity> {
    const { name, email, password } = schema;
    const user = new UserEntity();
    user.name = name;
    user.email = email;
    user.passwordHash = await bcrypt.hashSync(password, 12);
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
}
