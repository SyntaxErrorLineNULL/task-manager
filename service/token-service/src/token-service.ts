/**
 * Author: SyntaxErrorLineNULL.
 */

import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ClientProxy } from '@nestjs/microservices';
import { TokenException } from './infrastructure/exception/token.exception';

@Injectable()
export class TokenService {
  private cacheManager: Redis.Redis;
  constructor(
    @Inject('MAIL_SERVICE') private mailService: ClientProxy,
    @Inject('USER_SERVICE') private userService: ClientProxy,
  ) {
    this.cacheManager = new Redis('127.0.0.1:6379');
  }

  public async sendConfirmationToken(email: string): Promise<void> {
    if ((await this.cacheManager.exists(email)) === 0) throw TokenException.tokenSent();

    const token = Math.random().toString(36).substring(2, 9);
    const tokenOption = {
      email: email,
    };
    await this.cacheManager.set(email, '', 'EX', 1200);
    await this.cacheManager.set(token.toString(), JSON.stringify(tokenOption), 'EX', 3600);
  }

  public async completionConfirmation(confirmationToken: string): Promise<void> {
    if ((await this.cacheManager.exists(confirmationToken)) === 0) throw TokenException.tokenIsNotExists();

    const token = JSON.parse(await this.cacheManager.get(confirmationToken));
    await this.userService.send('change_status', token.email);
  }
}
