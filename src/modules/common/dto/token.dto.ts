/**
 * Author: SyntaxErrorLineNULL.
 */

import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty()
  public expiresIn: number;

  @ApiProperty()
  public accessToken: string;

  /**
   * @param data
   */
  constructor(data: { expiresIn: number; accessToken: string }) {
    this.expiresIn = data.expiresIn;
    this.accessToken = data.accessToken;
  }
}
