/**
 * Author: SyntaxErrorLineNULL.
 */

import { NestFactory } from '@nestjs/core';
import { TokenModule } from './token.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TokenModule, {
    transport: Transport.NATS,
    options: {
      servers: 'nats://localhost:4222',
    },
  });
  await app.listenAsync();
}
bootstrap();
