/**
 * Author: SyntaxErrorLineNULL.
 */

import { SendMailOptions } from 'nodemailer';

export interface CustomSendMailOptions extends SendMailOptions {
  template?: string;
}
