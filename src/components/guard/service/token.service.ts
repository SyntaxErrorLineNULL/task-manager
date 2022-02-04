/**
 * Author: SyntaxErrorLineNULL.
 */

import { MailService } from '../../core/mail/mail.service';
import { RedisService } from '../../core/store/redis-service';

export interface ConfirmationOptions {
  email: string;
  expires: Date;
  name: string;
}

export class TokenService {
  constructor(private mailService: MailService, private redis: RedisService) {}

  public async confirmationToken(options: ConfirmationOptions): Promise<void> {
    const date = new Date();
    const token = Math.random().toString(36).substring(2, 9);
    const tokenOption = {
      email: 'email@thiss.com',
      expires: date.setHours(date.getHours() + 2),
    };
    await this.redis.redisClient.set(token.toString(), JSON.stringify(tokenOption));

    await this.mailService.send(options.email, 'Welcome', './index', {
      name: options.name,
      token: token,
    });
  }
}
