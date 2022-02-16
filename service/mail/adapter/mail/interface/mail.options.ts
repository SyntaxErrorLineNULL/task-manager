/**
 * Author: SyntaxErrorLineNULL.
 */

import { SendMailOptions } from 'nodemailer';

export interface MailOptions extends SendMailOptions {
  template?: string;
}
