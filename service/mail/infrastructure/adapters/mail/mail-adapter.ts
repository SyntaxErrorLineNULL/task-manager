/**
 * Author: SyntaxErrorLineNULL.
 */

import { Inject, Injectable } from '@nestjs/common';
import { MAIL_OPTIONS, MailOptions } from './interface/mail.options';
import { createTransport, Transporter } from 'nodemailer';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as SMTPPool from 'nodemailer/lib/smtp-pool';
import * as SendmailTransport from 'nodemailer/lib/sendmail-transport';
import * as StreamTransport from 'nodemailer/lib/stream-transport';
import Mail from 'nodemailer/lib/mailer';
import { options } from 'tsconfig-paths/lib/options';

export type TransportType = SMTPTransport | SMTPPool | SendmailTransport | StreamTransport | string;

@Injectable()
export class MailAdapter {
  private transporter: Transporter;

  protected constructor(@Inject(MAIL_OPTIONS) private mailOptions: MailOptions) {
    if (!mailOptions.transport || Object.keys(mailOptions.transport).length <= 0)
      throw new Error('Transport configuration is not found');

    this.transporter = this.createMailTransport(mailOptions);
  }

  private createMailTransport(options: MailOptions): Mail {
    return createTransport(options.transport, options.defaults);
  }

  public async sendMail(options: MailOptions) {}
}
