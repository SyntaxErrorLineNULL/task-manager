import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigMailerService } from '../../../config/config-mailer.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: ConfigMailerService,
    }),
  ],
  providers: [MailService],
})
export class MailModule {}
