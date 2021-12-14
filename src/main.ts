/**
 * Author: SyntaxErrorLineNULL.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerSetup } from '../config/swagger-setup';
import { AuthorizationExceptionHandler } from './components/authorization/authorization.exception-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AuthorizationExceptionHandler());
  swaggerSetup(app);
  await app.listen(process.env.APP_PORT || 5000, '127.0.0.1');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
