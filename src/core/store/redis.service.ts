/**
 * Author: SyntaxErrorLineNULL.
 */

import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  public redisClient: Redis.Redis;

  constructor() {
    this.redisClient = new Redis('127.0.0.1:6379');
  }
}
