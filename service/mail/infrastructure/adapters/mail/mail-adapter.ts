/**
 * Author: SyntaxErrorLineNULL.
 */

import { Inject, Injectable } from '@nestjs/common';
import { MAIL_OPTIONS, MailOptions } from './interface/mail.options';
import { createTransport, SentMessageInfo, Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { CustomSendMailOptions } from './interface/custom-send-mail-options';

@Injectable()
export abstract class MailAdapter {
  private readonly transporter: Transporter;

  protected constructor(@Inject(MAIL_OPTIONS) private mailOptions: MailOptions) {
    if (!mailOptions.transport || Object.keys(mailOptions.transport).length <= 0)
      throw new Error('Transport configuration is not found');

    this.transporter = this.createMailTransport(mailOptions);
  }

  private createMailTransport(options: MailOptions): Mail {
    return createTransport(options.transport, options.defaults);
  }

  public async sendMail(options: CustomSendMailOptions): Promise<SentMessageInfo> {
    if (this.transporter) {
      return this.transporter.sendMail(options);
    }
    throw new ReferenceError('Transporter object undefined');
  }
}
