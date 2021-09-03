/**
 * Author: SyntaxErrorLineNULL.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerSetup } from '../config/swagger-setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerSetup(app);
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap().then((r): void => console.log(r));
