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
}

@Injectable()
export class TokenService {
  constructor(private mailService: MailService, private redis: RedisService, private userRepository: UserRepository) {}

  public async sendConfirmationToken(email: string, name: string): Promise<void> {
    const token = Math.random().toString(36).substring(2, 9);
    const tokenOption: ConfirmationOptions = {
      email: email,
    };
    await this.redis.redisClient.set(token.toString(), JSON.stringify(tokenOption), 'EX', 3600);

    await this.mailService.send(email, 'Welcome', 'index', {
      name: name,
      token: token,
    });
  }

  public async completionConfirmation(confirmationToken: string): Promise<void> {
    if ((await this.redis.redisClient.exists(confirmationToken)) === 0)
      throw AuthorizationException.wrongCompletionConfirmation();

    const token = JSON.parse(await this.redis.redisClient.get(confirmationToken));

    const user = await this.userRepository.findByEmail(token.email);
    if (!user) throw AuthorizationException.wrongSignIn();
    user.changeStatus(UserStatusEnum.STATUS_ACTIVE);
    await this.userRepository.save(user);
  }
}
