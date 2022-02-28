import { Injectable } from '@nestjs/common';
import { MailAdapter } from '../adapters/mail/mail-adapter';

@Injectable()
export class MailService {
  constructor(private mailerService: MailAdapter) {}

  public async send(email: string, message: string): Promise<void> {
    await this.mailerService
      .sendMail({
        to: email,
        subject: message,
        html: '<b>Hello world?</b>',
      })
      .catch(error => {
        console.log(error);
      });
  }
}
