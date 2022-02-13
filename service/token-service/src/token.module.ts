/**
 * Author: SyntaxErrorLineNULL.
 */

import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token-service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      socket: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ClientsModule.register([
      {
        name: 'MAIL_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: 'nats://localhost:4222',
        },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: 'nats://localhost:4222',
        },
      },
    ]),
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
