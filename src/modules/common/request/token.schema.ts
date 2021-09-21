/**
 * Author: SyntaxErrorLineNULL.
 */

import { ApiProperty } from '@nestjs/swagger';

export class TokenSchema {
  @ApiProperty({ description: 'auth-token expires' })
  public expiresIn: number;

  @ApiProperty({ description: 'auth-token' })
  public accessToken: string;

  /**
   * @param data
   */
  constructor(data: { expiresIn: number; accessToken: string }) {
    this.expiresIn = data.expiresIn;
    this.accessToken = data.accessToken;
  }
}
