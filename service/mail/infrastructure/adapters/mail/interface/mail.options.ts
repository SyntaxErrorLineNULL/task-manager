/**
 * Author: SyntaxErrorLineNULL.
 */

import { TransportType } from './transport.type';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as SMTPPool from 'nodemailer/lib/smtp-pool';
import * as SendmailTransport from 'nodemailer/lib/sendmail-transport';
import * as StreamTransport from 'nodemailer/lib/stream-transport';

export const MAIL_OPTIONS = 'MAIL_OPTIONS';

export interface MailOptions {
  defaults?: SMTPTransport.Options | SMTPPool.Options | SendmailTransport.Options | StreamTransport.Options;
  transport: TransportType;
  template?: {
    dir?: string;
    adapter?: any;
    options?: { [name: string]: any };
  };
  options?: { [name: string]: any };
}
