/**
 * Author: SyntaxErrorLineNULL.
 */

import { Controller, Post, Body } from '@nestjs/common';
import { GuardService } from '../../../components/guard/service/guard.service';
import { SignInDto } from '../dto/signin.dto';
import { RedisService } from '../../../core/store/redis-service';
import { UserRepository } from '../../../modules/user/entity/user.repository';
import { AuthorizationException } from '../../../components/exception/auth.exception';
import { SignUpDto } from '../dto/sign-up.dto';
import { generateString } from '@nestjs/typeorm';
import { PasswordService } from '../../../components/guard/service/password.service';

@Controller('api/user/auth')
export class UserAuthController {
  constructor(
    private guardService: GuardService,
    private redis: RedisService,
    private userRepository: UserRepository,
    private passwordService: PasswordService,
  ) {}

  @Post('sign-up')
  public async signUp(@Body() body: SignUpDto) {
    if (await this.userRepository.findOne({ email: body.email })) {
      throw AuthorizationException.wrongRegistration();
    }

    const user = await this.userRepository.create({
      id: generateString(),
      name: body.name,
      email: body.email,
      passwordHash: await this.passwordService.hash(body.password),
    });
    await this.userRepository.save(user);
    const date = new Date();
    const token = {
      email: 'email@thiss.com',
      expires: date.setHours(date.getHours() + 2),
    };
    await this.redis.redisClient.set('123456', JSON.stringify(token));
  }

  @Post('sign-in')
  public async login(@Body() body: SignInDto): Promise<any> {
    return await this.guardService.login(body.email, body.password);
  }
}
