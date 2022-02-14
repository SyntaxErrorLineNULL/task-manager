import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.NATS,
    options: {
      servers: 'nats://localhost:4222',
    },
  });
  await app.listenAsync();
}
bootstrap();
