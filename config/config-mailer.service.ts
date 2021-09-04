/**
 * Author: SyntaxErrorLineNULL.
 */
import { MailerOptionsFactory, MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Injectable()
export class ConfigMailerService implements MailerOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  public async createMailerOptions(): Promise<MailerOptions> {
    return {
      transport: {
        host: this.config.get<string>('MAILER_HOST'),
        secure: this.config.get<boolean>('MAILER_ENCRYPTION'),
        port: this.config.get<number>('MAILER_PORT'),
        auth: {
          user: this.config.get<string>('MAILER_USERNAME'),
          pass: this.config.get<string>('MAILER_PASSWORD'),
        },
      },
      defaults: {
        from: 'cyberorange@gmail.com',
      },
      template: {
        dir: join(__dirname, 'template/mail'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
