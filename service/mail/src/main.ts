import { NestFactory } from '@nestjs/core';
import { MailModule } from './mail.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  /*const app = await NestFactory.createMicroservice(MailModule, {
    transport: Transport.NATS,
    options: {
      servers: 'nats://localhost:4222',
    },
  });
  await app.listenAsync();*/
  const app = await NestFactory.create(MailModule);
  await app.listen(process.env.APP_PORT || 5000, '127.0.0.1');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
