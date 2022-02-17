/**
 * Author: SyntaxErrorLineNULL.
 */

import * as SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as SMTPPool from 'nodemailer/lib/smtp-pool';
import * as SendmailTransport from 'nodemailer/lib/sendmail-transport';
import * as StreamTransport from 'nodemailer/lib/stream-transport';

export type TransportType = SMTPTransport | SMTPPool | SendmailTransport | StreamTransport | string;
