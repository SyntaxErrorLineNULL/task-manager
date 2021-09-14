/**
 * Author: SyntaxErrorLineNULL.
 */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../application/repository/user.repository';
import { PasswordService } from '../../application/service/password.service';
import { SignUpDto } from '../common/dto/signUp.dto';
import UserEntity from '../../application/entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { TokenEntity } from '../../application/entity/token.entity';
import { UserStatusEnum } from '../../application/entity/user.status.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private passwordService: PasswordService,
  ) {}

  public async createUser(schema: SignUpDto, token): Promise<UserEntity> {
    const { name, email, password } = schema;
    const user = new UserEntity();
    user.name = name;
    user.email = email;
    user.passwordHash = await bcrypt.hashSync(password, 12);
    const confirmationToken = new TokenEntity();
    confirmationToken.value = token;
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
    if (user.confirmationToken.expires > new Date()) {
      throw new HttpException('Token is expired', HttpStatus.FORBIDDEN);
    }

    user.confirmationToken.value = null;
    user.confirmationToken.expires = null;
    user.status = UserStatusEnum.STATUS_ACTIVE;
    await this.userRepository.save(user);
  }
}
