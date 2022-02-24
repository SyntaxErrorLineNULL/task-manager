/**
 * Author: SyntaxErrorLineNULL.
 */

import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { MailOptions } from '../../adapters/mail/interface/mail.options';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailConfig {
  private static config: ConfigService;
  constructor(private readonly config: ConfigService) {}

  public static async createMailerOptions(): Promise<MailOptions> {
    return {
      transport: {
        host: this.config.get<string>('MAILER_HOST'),
        secure: this.config.get<boolean>('MAILER_SECURE'),
        port: this.config.get<number>('MAILER_PORT'),
        auth: {
          user: this.config.get<string>('MAILER_USERNAME'),
          pass: this.config.get<string>('MAILER_PASSWORD'),
        },
      },
      defaults: {
        from: 'type16@gmail.com',
      },
      template: {
        dir: process.cwd() + '/template/mail',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
