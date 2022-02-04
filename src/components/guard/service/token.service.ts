/**
 * Author: SyntaxErrorLineNULL.
 */

import { MailService } from '../../../core/mail/mail.service';
import { RedisService } from '../../../core/store/redis-service';
import { Injectable } from '@nestjs/common';
import { AuthorizationException } from '../../exception/auth.exception';
import { UserRepository } from '../../../modules/user/entity/user.repository';
import { UserStatusEnum } from '../../../modules/user/enum/user.status.enum';

export interface ConfirmationOptions {
  email: string;
  expires: Date;
  name: string;
}

@Injectable()
export class TokenService {
  constructor(private mailService: MailService, private redis: RedisService, private userRepository: UserRepository) {}

  public async confirmationToken(options: ConfirmationOptions): Promise<void> {
    const date = new Date();
    const token = Math.random().toString(36).substring(2, 9);
    const tokenOption = {
      email: options.email,
      expires: date.setHours(date.getHours() + 2),
    };
    await this.redis.redisClient.set(token.toString(), JSON.stringify(tokenOption));

    await this.mailService.send(options.email, 'Welcome', './index', {
      name: options.name,
      token: token,
    });
  }

  public async completionConfirmation(option): Promise<void> {
    let token: any;

    token = await this.redis.redisClient.exists(option.token);
    if (token !== 1) throw AuthorizationException.wrongCompletionConfirmation();
    token = JSON.parse(await this.redis.redisClient.get(option.token));
    if (token.expires > Date.now()) throw AuthorizationException.wrongCompletionConfirmation();

    const user = await this.userRepository.findByEmail(token.email);
    if (!user) throw AuthorizationException.wrongSignIn();
    user.changeStatus(UserStatusEnum.STATUS_ACTIVE);
    await this.userRepository.save(user);
    await this.redis.redisClient.del(option.token);
  }
}
