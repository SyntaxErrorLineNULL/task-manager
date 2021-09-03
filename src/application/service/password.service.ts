/**
 * Author: SyntaxErrorLineNULL.
 */

import { bcrypt } from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {
  rounds = `k>CwKU4W=G|I__1$9CT,.re,\'b<H)I`;

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.rounds, (error, result) => {
      error ? new Error('Hash password is not success') : console.log(result);
    });
  }

  async validate(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash, (error, result) => {
      error
        ? new Error('Compare password is not success')
        : console.log(result);
    });
  }
}
