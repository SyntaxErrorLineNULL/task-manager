/**
 * Author: SyntaxErrorLineNULL.
 */

import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token-service';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      socket: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
