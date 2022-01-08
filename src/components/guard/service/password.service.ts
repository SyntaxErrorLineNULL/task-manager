/**
 * Author: SyntaxErrorLineNULL.
 */

import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {
  // TODO: refactoring password hash
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.salt(13);
    return await bcrypt.hash(password, salt);
  }

  async validate(password: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }

  async passwordGenerator(): Promise<string> {
    const alphabet = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&*()_+|/*-+[]{};:,./?><';
    let password = '';
    for (let i = 0; i <= 9; i++) {
      const random = Math.floor(Math.random() * alphabet.length);
      password += alphabet.substring(random, random + 1);
    }
    return password;
  }
}
