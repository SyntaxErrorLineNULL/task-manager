/**
 * Author: SyntaxErrorLineNULL.
 */

import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 13);
  }

  async validate(password: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }
}
