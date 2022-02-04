/**
 * Author: SyntaxErrorLineNULL.
 */

import { RedisOptions } from 'ioredis';

export const redisOptions: RedisOptions = {
  host: '127.0.0.1',
  port: 6379,
};

export const redisMainCluster = {
  modules: [
    {
      host: 'redis1',
      port: 6379,
      return_buffers: true,
    },
    {
      host: 'redis2',
      port: 6379,
      return_buffers: true,
    },
    {
      host: 'redis3',
      port: 6379,
      return_buffers: true,
    },
  ],
};
