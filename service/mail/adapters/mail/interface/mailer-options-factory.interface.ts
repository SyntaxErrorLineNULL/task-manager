/**
 * Author: SyntaxErrorLineNULL.
 */

import { MailOptions } from './mail.options';

export interface MailerOptionsFactory {
  createMailerOptions(): Promise<MailOptions> | MailOptions;
}
