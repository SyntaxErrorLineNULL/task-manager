/**
 * Author: SyntaxErrorLineNULL.
 */

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { generateString, InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './entity/user.repository';
import { SignUpSchema } from '../common/request/signUp.schema';
import { User } from './entity/user.entity';
import { Token } from './entity/token.entity';
import { PasswordService } from '../../components/guard/service/password.service';
import { UserStatusEnum } from './enum/user.status.enum';
import { Role } from './enum/role';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  public async onApplicationBootstrap() {
    let user = await this.userRepository.findOne({ where: { email: 'cyberorange16@gmail.com' } });
    if (!user) {
      user = this.userRepository.create({
        id: generateString(),
        name: 'Alex',
        email: 'cyberorange16@gmail.com',
        passwordHash: await this.passwordService.hash('12345'),
        createAt: new Date(),
        status: UserStatusEnum.STATUS_ACTIVE,
        role: Role.OWNER,
      });
      await this.userRepository.save(user);
      console.log('user install');
    }
  }

  public async create(schema: SignUpSchema, confirmationToken: Token): Promise<User> {
    const user = this.userRepository.create({
      id: generateString(),
      name: schema.name,
      email: schema.email,
      passwordHash: await this.passwordService.hash(schema.password),
      createAt: new Date(),
      role: Role.USER,
      confirmationToken: confirmationToken,
    });
    return await this.userRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  public async getAll(): Promise<User[]> {
    return await this.userRepository.getAllUser();
  }

  public async confirmationToken(token: string): Promise<void> {
    const user = await this.userRepository.getByToken(token);
    user.confirmationRegistration(new Date());
    await this.userRepository.save(user);
  }
}
