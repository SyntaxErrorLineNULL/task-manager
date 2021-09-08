/**
 * Author: SyntaxErrorLineNULL.
 */

import { bcryptjs } from 'bcryptjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {
  rounds = `k>CwKU4W=G|I__1$9CT,.re,\'b<H)I`;

  async hash(password: string): Promise<string> {
    return await bcryptjs.genSalt(12, (error, salt) => {
      bcryptjs.hashSync(password, salt, (error, hash) => {
        error ? new Error('Hash password is not success') : console.log(hash);
      });
    });
  }

  async validate(password: string, hash: string): Promise<boolean> {
    return await bcryptjs.compareSync(password, hash, (error, result) => {
      error
        ? new Error('Compare password is not success')
        : console.log(result);
    });
  }
}
