import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailAdapter } from '../adapters/mail/mail-adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '../adapters/template/handlebars.adapter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true,
    }),
  ],
  controllers: [MailController],
  providers: [
    MailService,
    {
      provide: MailAdapter,
      useFactory: (config: ConfigService) =>
        new MailAdapter({
          transport: {
            host: config.get<string>('MAILER_HOST'),
            secure: config.get<boolean>('MAILER_SECURE'),
            port: config.get<number>('MAILER_PORT'),
            auth: {
              user: config.get<string>('MAILER_USERNAME'),
              pass: config.get<string>('MAILER_PASSWORD'),
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
        }),
      inject: [ConfigService],
    },
  ],
})
export class MailModule {}
