/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { MailModule } from './core/mail/mail.module';
import { DatabaseModule } from './core/database/database.module';
import { LoggerModule } from './core/logger/logger.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer.service';
import { AdminModule } from './modules/admin/admin.module';
import { UserAuthModule } from './api/auth/user/user-auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true,
    }),
    MulterModule.register(multerOptions),
    UserModule,
    MailModule,
    DatabaseModule,
    LoggerModule,
    AdminModule,
    UserAuthModule,
  ],
})
export class AppModule {}
