/**
 * Author: SyntaxErrorLineNULL.
 */

import { TransportType } from './transport.type';

export const MAIL_OPTIONS = 'MAIL_OPTIONS';

export interface MailOptions {
  transport: TransportType;
  template?: {
    dir?: string;
    adapter?: any;
    options?: { [name: string]: any };
  };
  options?: { [name: string]: any };
}
