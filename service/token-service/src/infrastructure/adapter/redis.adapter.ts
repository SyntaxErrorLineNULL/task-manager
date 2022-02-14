/**
 * Author: SyntaxErrorLineNULL.
 */

import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisAdapter {
  public cacheManager: Redis.Redis;
  constructor() {
    this.cacheManager = new Redis('127.0.0.1:6379');
  }
}
